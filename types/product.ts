import { ICategory, ISubCategory } from "./category";

export interface IProduct {
  id: string,
  name: string,
  categoryId: string,
  unit: string
  subcategoryId: string

}  