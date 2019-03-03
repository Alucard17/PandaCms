import { Document, Schema, Model, model} from "mongoose";
import { ICategory } from "../interfaces/category";
import * as uniqueValidator from 'mongoose-unique-validator';

export interface ICategoryModel extends ICategory, Document{}

export var CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    createdAt: Date,
    updatedAt: { type: Date, default: null }
});

CategorySchema.pre<ICategoryModel>("save", function(next){
    let now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
});
CategorySchema.plugin(uniqueValidator);
export const Category: Model<ICategoryModel> = model<ICategoryModel>("Category", CategorySchema);