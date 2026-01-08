'use client';

import {  IShoppingListItem } from '@/types/shopping-list';
import React from 'react';
import CurrentProductItem from './CurrentProductItem';

interface ICurrentProductList {
    currentList: IShoppingListItem[]
    setItems: React.Dispatch<React.SetStateAction<IShoppingListItem[]>>
}

export default function CurrentProductList({setItems, currentList, }: ICurrentProductList) {

   
    return (
        <div>
            <ul className='flex flex-col gap-2'>
                {
                    currentList.map(el => (
                        <CurrentProductItem setItems={setItems} key={el.id} item={el} />
                    ))
                }
            </ul>
        </div>
    );
}