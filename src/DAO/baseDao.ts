import { Document, Model } from "mongoose";
import { replaceAll, throw_BAD_REQUEST } from "../util";

export default abstract class BaseDao<T extends Document> {
    _collection: Model<T>;
    public async GetById(_id: string): Promise<T> {
      return this._collection.findById(_id).exec();
    }
  
    public async DeleteById(_id: string): Promise<boolean> {
      let result = await this._collection.deleteOne({ _id: _id });
      return (result.ok || 0) == 1;
    }
  
    public GetAll(pageIndex: number, limit: number): Promise<T[]> {
      return this._collection
        .find()
        .skip(pageIndex)
        .limit(limit)
        .exec();
    }
  
    public async create(data: any): Promise<T> {
      try {
        let newEntity = new this._collection(data);
        return await newEntity.save();
      } catch (error) {
          this.throwExceptions(error);
      }
    }
  
    public async Update(id: string, data: any): Promise<T> {
      try {
        return await this._collection.findByIdAndUpdate(
          id,
          { $set: data },
          { runValidators: true }
        );
      } catch (error) {
          this.throwExceptions(error);
      }
    }
  
    private throwExceptions(error: any) : never{
      if (error.name == "ValidationError") {
          throw {
            name: "ValidationError",
            message: replaceAll(error.message, "Path", "field")
          };
        }
        throw error;
    }
  }