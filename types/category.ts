export interface ICategory {
    id: string,
    name: string
    subcategory: ISubCategory[]
}

export interface ISubCategory {
    id: string,
    name: string
    categoryId: string
}