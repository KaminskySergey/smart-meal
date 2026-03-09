'use client';

import { Container } from "../ui/Container";
import AddProductsToList from "../ui/AddProductsToList";
import { useState } from "react";
import { IProduct } from "@/types/product";
import { ICategory } from "@/types/category";
import { addProductToInventory } from "@/action/inventory";
import { IInventoryItem } from "@/types/inventory";
import InventoryTable from "./InventoryTable";
import TitleH1 from "../ui/TitleH1";

interface IInventoryComponent {
    products: IProduct[]
    categories: ICategory[]
    intentoryItems: IInventoryItem[]
}

export default function InventoryComponent({ products, categories, intentoryItems }: IInventoryComponent) {
    const [items, setItems] = useState(intentoryItems)
    return (
        <section className='py-16 '>
            <Container className="flex flex-col gap-8">

                <div>
                    <TitleH1 title="My Inventory" />
                </div>
                <div className='flex gap-12 px-6'>
                    <div className='w-[70%]'>

                        <InventoryTable setItems={setItems} items={items} />
                    </div>
                    <div className='w-[30%]'>
                        <AddProductsToList setItems={setItems} products={products} categories={categories} onAdd={(productId, quantity) => addProductToInventory(productId, quantity)} />
                    </div>
                </div>
            </Container>
        </section>
    )
}