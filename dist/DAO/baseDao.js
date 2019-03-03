"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
class BaseDao {
    async GetById(_id) {
        return this._collection.findById(_id).exec();
    }
    async DeleteById(_id) {
        let result = await this._collection.deleteOne({ _id: _id });
        return (result.ok || 0) == 1;
    }
    GetAll(pageIndex, limit) {
        return this._collection
            .find()
            .skip(pageIndex)
            .limit(limit)
            .exec();
    }
    async create(data) {
        try {
            let newEntity = new this._collection(data);
            return await newEntity.save();
        }
        catch (error) {
            this.throwExceptions(error);
        }
    }
    async Update(id, data) {
        try {
            return await this._collection.findByIdAndUpdate(id, { $set: data }, { runValidators: true });
        }
        catch (error) {
            this.throwExceptions(error);
        }
    }
    throwExceptions(error) {
        if (error.name == "ValidationError") {
            throw {
                name: "ValidationError",
                message: util_1.replaceAll(error.message, "Path", "field")
            };
        }
        throw error;
    }
}
exports.default = BaseDao;
//# sourceMappingURL=baseDao.js.map