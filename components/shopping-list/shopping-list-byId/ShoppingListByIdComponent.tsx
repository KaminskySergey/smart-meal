'use client'
import { Container } from '@/components/ui/Container';
import AddProductsToList from '../../ui/AddProductsToList';
import { ICategory } from '@/types/category';

import { IProduct } from '@/types/product';
import { IShoppingList } from '@/types/shopping-list';

import ShoppingListDetail from './ShoppingListDetail';
import { useState } from 'react';
import ShoppingListProgress from './ShoppingListProgress';

import NoItemsShopping from '@/components/ui/NoItemsShopping';
import { addProductToShoppingList } from '@/action/shopping-list';

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
              <AddProductsToList setItems={setItems} products={products} categories={categories}  onAdd={(productId, quantity) => addProductToShoppingList(productId, quantity, shoppingListById.id)} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}