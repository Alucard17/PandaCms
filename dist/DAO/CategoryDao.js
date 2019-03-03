"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../schemas/category");
const baseDao_1 = require("./baseDao");
class CategoryDao extends baseDao_1.default {
    constructor() {
        super(...arguments);
        this._collection = category_1.Category;
    }
}
exports.CategoryDao = CategoryDao;
//# sourceMappingURL=CategoryDao.js.map