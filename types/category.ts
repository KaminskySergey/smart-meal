export interface ICategory {
    id: string,
    name: string
    slug: string
    subcategory: ISubCategory[]
}

export interface ISubCategory {
    id: string,
    name: string
    categoryId: string
    slug: string
}