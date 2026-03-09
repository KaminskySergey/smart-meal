
import { getCategory } from "@/action/category";
import { getProducts, getShippingListById } from "@/action/shopping-list";
import ShoppingListByIdComponent from "@/components/shopping-list/shopping-list-byId/ShoppingListByIdComponent";
import { notFound } from "next/navigation";


interface IShoppingListByIdPage {
    params: Promise<{ [key: string]: string }>,
    searchParams: Promise<{ [key: string]: string }>,
}

export default async function ShoppingListByIdPage({ params, searchParams }: IShoppingListByIdPage) {
    const { listId } = await params;
    const {categoryId, subcategoryId, searchTerm} = await searchParams
    const products = await getProducts(categoryId, subcategoryId, searchTerm, listId)
    const shoppingListById = await getShippingListById(listId)
    const categories = await getCategory()
    if(!shoppingListById) {
        notFound()
    }
    return (
        <ShoppingListByIdComponent products={products} categories={categories}   shoppingListById={shoppingListById}/>
    );
}