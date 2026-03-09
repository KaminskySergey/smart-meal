

export interface IProduct {
  id: string,
  name: string,
  categoryId: string,
  unit: string
  subcategoryId: string
  slug: string
  createdAt: Date; 
  updatedAt: Date;
}  



export interface IGetProducts {
  data: IProduct[],
  totalPages: number,
  totalCount: number,
  subCategoryName: string | null
}