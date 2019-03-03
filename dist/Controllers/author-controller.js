"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const HTTP_STATUS = require("http-status-codes");
const koaBody = require("koa-body");
const util_1 = require("../util");
const AuthorDao_1 = require("../DAO/AuthorDao");
const AuthorRouter = new Router({
    prefix: "/author"
});
AuthorRouter.use(koaBody());
AuthorRouter.get("/:id", async (ctx) => {
    let authorDao = new AuthorDao_1.AuthorDao();
    let Author = await authorDao.GetById(ctx.params.id);
    if (Author)
        ctx.body = Author;
    else
        ctx.throw(HTTP_STATUS.NOT_FOUND, `Author not found for id: ${ctx.params.id}`);
});
AuthorRouter.delete("/:id", async (ctx) => {
    let authorDao = new AuthorDao_1.AuthorDao();
    let Author = await authorDao.GetById(ctx.params.id);
    if (Author)
        ctx.body = Author;
    else
        ctx.throw(HTTP_STATUS.NOT_FOUND, `Author not found for id: ${ctx.params.id}`);
});
AuthorRouter.get("/", async (ctx) => {
    let authorDao = new AuthorDao_1.AuthorDao();
    let limit = ctx.query.limit || 10;
    let pageIndex = ctx.query.limit || 0;
    ctx.body = await authorDao.GetAll(pageIndex, limit);
});
AuthorRouter.post("/", async (ctx) => {
    try {
        let authorDao = new AuthorDao_1.AuthorDao();
        let savedAuthor = await authorDao.create(ctx.request.body);
        ctx.status = HTTP_STATUS.CREATED;
        ctx.body = savedAuthor;
    }
    catch (error) {
        if (error.name == "ValidationError")
            util_1.throw_BAD_REQUEST(ctx, error);
        throw error;
    }
});
AuthorRouter.put("/:id", async (ctx) => {
    try {
        let authorDao = new AuthorDao_1.AuthorDao();
        let existingAuthor = await authorDao.GetById(ctx.params.id);
        if (existingAuthor) {
            let savedAuthor = await authorDao.Update(ctx.params.id, Object.assign({}, ctx.request.body, { updatedAt: new Date() }));
            ctx.status = HTTP_STATUS.CREATED;
            ctx.body = savedAuthor;
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
exports.default = AuthorRouter;
//# sourceMappingURL=author-controller.js.map