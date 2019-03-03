import * as Koa from "koa";
import * as Router from "koa-router";
import * as HTTP_STATUS from "http-status-codes";
import koaBody = require("koa-body");
import { throw_BAD_REQUEST } from "../util";
import { CategoryDao } from "../DAO/CategoryDao";

const CategoryRouter = new Router({
  prefix: "/category"
});
CategoryRouter.use(koaBody());

CategoryRouter.get("/:id", async ctx => {
  let categoryDao = new CategoryDao();
  let Category = await categoryDao.GetById(ctx.params.id);
  if (Category) ctx.body = Category;
  else
    ctx.throw(
      HTTP_STATUS.NOT_FOUND,
      `Category not found for id: ${ctx.params.id}`
    );
});

CategoryRouter.delete("/:id", async ctx => {
  let categoryDao = new CategoryDao();
  let Category = await categoryDao.DeleteById(ctx.params.id);
  if (Category) ctx.body = Category;
  else
    ctx.throw(
      HTTP_STATUS.NOT_FOUND,
      `Category not found for id: ${ctx.params.id}`
    );
});

CategoryRouter.get("/", async ctx => {
  let categoryDao = new CategoryDao();
  let limit: number = ctx.query.limit || 10;
  let pageIndex: number = ctx.query.limit || 0;
  ctx.body = await categoryDao.GetAll(pageIndex, limit);
});

CategoryRouter.post("/", async ctx => {
  try {
    let categoryDao = new CategoryDao();
    let savedCategory = await categoryDao.create(ctx.request.body);
    ctx.status = HTTP_STATUS.CREATED;
    ctx.body = savedCategory;
  } catch (error) {
    if (error.name == "ValidationError") throw_BAD_REQUEST(ctx, error);
    throw error;
  }
});

CategoryRouter.put("/:id", async ctx => {
  try {
    let categoryDao = new CategoryDao();
    let existingCategory = await categoryDao.GetById(ctx.params.id);
    if (existingCategory) {
      let savedCategory = await categoryDao.Update(ctx.params.id, {
        ...ctx.request.body,
        updatedAt: new Date()
      });
      ctx.status = HTTP_STATUS.CREATED;
      ctx.body = savedCategory;
    } else {
      ctx.throw(HTTP_STATUS.NOT_FOUND, "Category not found");
    }
  } catch (error) {
    if (error.name == "ValidationError") throw_BAD_REQUEST(ctx, error);
    throw error;
  }
});

export default CategoryRouter;
