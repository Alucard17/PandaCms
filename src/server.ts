import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';
import * as mongoose from 'mongoose';
import CategoryRouter from './Controllers/Category-controller';import AuthorRouter from './Controllers/author-controller';
;

mongoose.connect('mongodb://localhost/test');
const app = new Koa();
app.use(CategoryRouter.routes());
app.use(AuthorRouter.routes());
app.listen(3000);

console.log('Server running on port 3000');