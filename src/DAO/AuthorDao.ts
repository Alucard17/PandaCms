import { Author, IAuthorModel } from "../schemas/author";
import BaseDao from "./baseDao";

export class AuthorDao extends BaseDao<IAuthorModel> {
  _collection = Author;
}
