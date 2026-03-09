import { getCategory } from "@/action/category";
import { getInventory, getProductsInventory } from "@/action/inventory";
import { getProducts } from "@/action/products";
import InventoryComponent from "@/components/inventory/InventoryComponent";

interface IInventory {
    params: Promise<{ [key: string]: string }>,
    searchParams: Promise<{ [key: string]: string }>,
}

export default async function Inventory({ searchParams }: IInventory) {
    const { categoryId, subcategoryId, searchTerm } = await searchParams
    const products = await getProductsInventory(categoryId, subcategoryId, searchTerm)
    const categories = await getCategory()
    const inventory = await getInventory()
    return <InventoryComponent products={products} intentoryItems={inventory} categories={categories} />
}