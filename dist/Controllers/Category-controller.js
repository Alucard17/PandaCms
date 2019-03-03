"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const HTTP_STATUS = require("http-status-codes");
const koaBody = require("koa-body");
const util_1 = require("../util");
const CategoryDao_1 = require("../DAO/CategoryDao");
const CategoryRouter = new Router({
    prefix: "/category"
});
CategoryRouter.use(koaBody());
CategoryRouter.get("/:id", async (ctx) => {
    let categoryDao = new CategoryDao_1.CategoryDao();
    let Category = await categoryDao.GetById(ctx.params.id);
    if (Category)
        ctx.body = Category;
    else
        ctx.throw(HTTP_STATUS.NOT_FOUND, `Category not found for id: ${ctx.params.id}`);
});
CategoryRouter.delete("/:id", async (ctx) => {
    let categoryDao = new CategoryDao_1.CategoryDao();
    let Category = await categoryDao.DeleteById(ctx.params.id);
    if (Category)
        ctx.body = Category;
    else
        ctx.throw(HTTP_STATUS.NOT_FOUND, `Category not found for id: ${ctx.params.id}`);
});
CategoryRouter.get("/", async (ctx) => {
    let categoryDao = new CategoryDao_1.CategoryDao();
    let limit = ctx.query.limit || 10;
    let pageIndex = ctx.query.limit || 0;
    ctx.body = await categoryDao.GetAll(pageIndex, limit);
});
CategoryRouter.post("/", async (ctx) => {
    try {
        let categoryDao = new CategoryDao_1.CategoryDao();
        let savedCategory = await categoryDao.create(ctx.request.body);
        ctx.status = HTTP_STATUS.CREATED;
        ctx.body = savedCategory;
    }
    catch (error) {
        if (error.name == "ValidationError")
            util_1.throw_BAD_REQUEST(ctx, error);
        throw error;
    }
});
CategoryRouter.put("/:id", async (ctx) => {
    try {
        let categoryDao = new CategoryDao_1.CategoryDao();
        let existingCategory = await categoryDao.GetById(ctx.params.id);
        if (existingCategory) {
            let savedCategory = await categoryDao.Update(ctx.params.id, Object.assign({}, ctx.request.body, { updatedAt: new Date() }));
            ctx.status = HTTP_STATUS.CREATED;
            ctx.body = savedCategory;
        }
        else {
            ctx.throw(HTTP_STATUS.NOT_FOUND, "Category not found");
        }
    }
    catch (error) {
        if (error.name == "ValidationError")
            util_1.throw_BAD_REQUEST(ctx, error);
        throw error;
    }
});
exports.default = CategoryRouter;
//# sourceMappingURL=Category-controller.js.map