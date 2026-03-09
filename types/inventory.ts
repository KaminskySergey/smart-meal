import { IRequiredFields } from "./base";
import { IProduct } from "./product";

export interface IInventoryItem extends IRequiredFields {
    productId: string,
    userId: string,
    unit: string,
    quantity: number,
    product: IProduct
}

