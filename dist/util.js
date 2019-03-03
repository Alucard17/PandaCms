"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP_STATUS = require("http-status-codes");
function throw_400(ctx, exception) {
    ctx.throw(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
        message: "something went wrong",
        error: exception
    });
}
exports.throw_400 = throw_400;
function throw_BAD_REQUEST(ctx, exception) {
    ctx.throw(HTTP_STATUS.BAD_REQUEST, {
        message: "Validation error",
        error: exception
    });
}
exports.throw_BAD_REQUEST = throw_BAD_REQUEST;
function replaceAll(str, search, replacement) {
    return str.split(search).join(replacement);
}
exports.replaceAll = replaceAll;
//# sourceMappingURL=util.js.map