'use client';

import { IShoppingList, IShoppingListItem } from '@/types/shopping-list';
import React from 'react';
import CurrentProductList from './CurrentProductList';

interface IShoppingListDetail {
  shoppingListById: IShoppingList
  setItems: React.Dispatch<React.SetStateAction<IShoppingListItem[]>>
  items: IShoppingListItem[]
}


export default function ShoppingListDetail({shoppingListById, setItems, items}: IShoppingListDetail) {
  
  return (
    <div>
     <CurrentProductList setItems={setItems} currentList={items}/>
    </div>
  );
}