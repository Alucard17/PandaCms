import * as Koa from "koa";
import * as Router from "koa-router";
import * as HTTP_STATUS from "http-status-codes";
import koaBody = require("koa-body");
import { throw_BAD_REQUEST } from "../util";
import { AuthorDao } from "../DAO/AuthorDao";

const AuthorRouter = new Router({
  prefix: "/author"
});
AuthorRouter.use(koaBody());

AuthorRouter.get("/:id", async ctx => {
  let authorDao = new AuthorDao();
  let Author = await authorDao.GetById(ctx.params.id);
  if (Author) ctx.body = Author;
  else
    ctx.throw(
      HTTP_STATUS.NOT_FOUND,
      `Author not found for id: ${ctx.params.id}`
    );
});

AuthorRouter.delete("/:id", async ctx => {
    let authorDao = new AuthorDao();
    let Author = await authorDao.GetById(ctx.params.id);
    if (Author) ctx.body = Author;
    else
        ctx.throw(
        HTTP_STATUS.NOT_FOUND,
        `Author not found for id: ${ctx.params.id}`
        );
});

AuthorRouter.get("/", async ctx => {
    let authorDao = new AuthorDao();
  let limit: number = ctx.query.limit || 10;
  let pageIndex: number = ctx.query.limit || 0;
  ctx.body = await authorDao.GetAll(pageIndex, limit);
});

AuthorRouter.post("/", async ctx => {
  try {
    let authorDao = new AuthorDao();
    let savedAuthor = await authorDao.create(ctx.request.body);
    ctx.status = HTTP_STATUS.CREATED;
    ctx.body = savedAuthor;
  } catch (error) {
    if (error.name == "ValidationError") throw_BAD_REQUEST(ctx, error);
    throw error;
  }
});

AuthorRouter.put("/:id", async ctx => {
  try {
    let authorDao = new AuthorDao();
    let existingAuthor = await authorDao.GetById(ctx.params.id);
    if (existingAuthor) {
      let savedAuthor = await authorDao.Update(ctx.params.id, {
        ...ctx.request.body,
        updatedAt: new Date()
      });
      ctx.status = HTTP_STATUS.CREATED;
      ctx.body = savedAuthor;
    } else {
      ctx.throw(HTTP_STATUS.NOT_FOUND, "Category not found");
    }
  } catch (error) {
    if (error.name == "ValidationError") throw_BAD_REQUEST(ctx, error);
    throw error;
  }
});

export default AuthorRouter;