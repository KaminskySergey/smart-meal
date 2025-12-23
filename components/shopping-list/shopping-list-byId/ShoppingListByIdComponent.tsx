'use client'
import { Container } from '@/components/ui/Container';
import AddProductsToList from './AddProductsToList';
import { ICategory } from '@/types/category';
import { getCategory } from '@/action/category';
import { IProduct } from '@/types/product';
import { IShoppingList, IShoppingListItem } from '@/types/shopping-list';
import ShoppingList from './ShoppingListDetail';
import ShoppingListDetail from './ShoppingListDetail';
import { useState } from 'react';
import ShoppingListProgress from './ShoppingListProgress';
import { useProgressBar } from '@/hooks/useProgressBar';
import NoItemsShopping from '@/components/ui/NoItemsShopping';

interface IShoppingListByIdComponent {
  products: IProduct[]
  shoppingListById: IShoppingList
  categories: ICategory[]

}

export default function ShoppingListByIdComponent({ products, shoppingListById, categories }: IShoppingListByIdComponent) {

  const [items, setItems] = useState(shoppingListById.items)

  return (
    <>
      <ShoppingListProgress nameList={shoppingListById.name} items={items} />
      <section className='pb-16'>
        <Container className='flex flex-col gap-8'>

          <div className='flex gap-12 px-6'>
            <div className='w-[70%]'>
              {items.length !== 0 ?
                <ShoppingListDetail setItems={setItems} items={items} shoppingListById={shoppingListById} /> : <NoItemsShopping title='No products in your list'/>}
            </div>
            <div className='w-[30%]'>
              <AddProductsToList setItems={setItems} products={products} categories={categories} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}