"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const author_1 = require("../schemas/author");
const baseDao_1 = require("./baseDao");
class AuthorDao extends baseDao_1.default {
    constructor() {
        super(...arguments);
        this._collection = author_1.Author;
    }
}
exports.AuthorDao = AuthorDao;
//# sourceMappingURL=AuthorDao.js.map