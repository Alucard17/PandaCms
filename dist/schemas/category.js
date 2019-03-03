"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
exports.CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    createdAt: Date,
    updatedAt: { type: Date, default: null }
});
exports.CategorySchema.pre("save", function (next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.CategorySchema.plugin(uniqueValidator);
exports.Category = mongoose_1.model("Category", exports.CategorySchema);
//# sourceMappingURL=category.js.map