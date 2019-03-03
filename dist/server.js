"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const mongoose = require("mongoose");
const Category_controller_1 = require("./Controllers/Category-controller");
const author_controller_1 = require("./Controllers/author-controller");
;
mongoose.connect('mongodb://localhost/test');
const app = new Koa();
app.use(Category_controller_1.default.routes());
app.use(author_controller_1.default.routes());
app.listen(3000);
console.log('Server running on port 3000');
//# sourceMappingURL=server.js.map