import { Document, Schema, Model, model} from "mongoose";
import { IAuthor } from "../interfaces/author";
import * as uniqueValidator from 'mongoose-unique-validator';

export interface IAuthorModel extends IAuthor, Document{}

export var AuthorSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    socialLinks: [{ platform: String, url: String }],
    createdAt: Date,
    updatedAt: { type: Date, default: null }
});

AuthorSchema.pre<IAuthorModel>("save", function(next){
    let now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
});
AuthorSchema.plugin(uniqueValidator);
export const Author: Model<IAuthorModel> = model<IAuthorModel>("Author", AuthorSchema);