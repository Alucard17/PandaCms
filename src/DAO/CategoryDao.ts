import { Category, ICategoryModel } from "../schemas/category";
import BaseDao from "./baseDao";

export class CategoryDao extends BaseDao<ICategoryModel> {
  _collection = Category;
}
