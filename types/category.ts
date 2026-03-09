import { IRequiredFields } from "./base";
import { IProduct } from "./product";

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  subcategory: ISubCategory[];
}

export interface ISubCategory {
  id: string;
  name: string;
  categoryId: string;
  slug: string;
}

export interface ISubCategoryPreview {
  id: string;
  name: string;
  categoryId: string;
  slug: string;
  products: IProduct[];
}

export interface ICategoryPreview extends IRequiredFields {
  name: string;
  slug: string;
  subcategory: ISubCategoryPreview[];
}
