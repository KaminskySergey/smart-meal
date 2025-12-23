import { IRequiredFields } from "./base"
import { IProduct } from "./product"

export interface IShoppingList extends IRequiredFields {
    name: string
    userId: string
    items: IShoppingListItem[]
}

export interface IShoppingListItem extends IRequiredFields{
    quantity: number
    unit: string
    shoppingListId: string
    product: IProduct
    productId: string
    bought: boolean
}

