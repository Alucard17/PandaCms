"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
exports.AuthorSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    socialLinks: [{ platform: String, url: String }],
    createdAt: Date,
    updatedAt: { type: Date, default: null }
});
exports.AuthorSchema.pre("save", function (next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
exports.AuthorSchema.plugin(uniqueValidator);
exports.Author = mongoose_1.model("Author", exports.AuthorSchema);
//# sourceMappingURL=author.js.map