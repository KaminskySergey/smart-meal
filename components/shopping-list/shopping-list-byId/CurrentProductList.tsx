'use client';

import Button from '@/components/ui/Button';
import { IShoppingList, IShoppingListItem } from '@/types/shopping-list';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
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