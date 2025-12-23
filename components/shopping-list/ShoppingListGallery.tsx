'use client';

import { IShoppingList } from '@/types/shopping-list';
import React from 'react';
import ShoppingGalleryItem from './ShoppingGalleryItem';

interface IShoppingListGallery {
    shoppingList: IShoppingList[]  
}

export default function ShoppingListGallery({shoppingList}: IShoppingListGallery) {
  return (
    
      <ul className='grid grid-cols-2 gap-4 w-full group'>
{shoppingList.map(el => (
  <ShoppingGalleryItem key={el.id} item={el}/>
))}
      </ul>
   
  );
}