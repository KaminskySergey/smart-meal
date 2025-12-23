'use client';

import { deleteProductFromIShoppingList, toggleShoppingListItemBought } from '@/action/shopping-list';
import { IShoppingListItem } from '@/types/shopping-list';
import { cn } from '@/utils/utils';
import { Check, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface ICurrentProductItem {
    item: IShoppingListItem
    setItems: React.Dispatch<React.SetStateAction<IShoppingListItem[]>>
}


export default function CurrentProductItem({ item, setItems }: ICurrentProductItem) {

    const [bought, setBought] = useState(item.bought)

    const handleBought = async () => {
        setBought(prev => !prev)
        setItems(prev =>
            prev.map(el =>
                el.id === item.id ? { ...el, bought: !el.bought } : el
            )
        )
        try {
            await toggleShoppingListItemBought(item.id)
        } catch (error) {
            setBought(prev => !prev)
            setItems(prev =>
                prev.map(el =>
                    el.id === item.id ? { ...el, bought: !el.bought } : el
                )
            )
            toast.error('Could not update status. Please try again.')
        }
    }


    const handleDelete = async () => {
        try {
            await deleteProductFromIShoppingList(item.id)
            setItems(prev => prev.filter(el => el.id !== item.id))
            toast.success('Product successfully deleted from your shopping list')
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong. Please try again.')
        }
    }

    return (
        <li key={item.id} className="list-none">
            <div
                className={cn(
                    "relative overflow-hidden w-full flex items-center justify-between text-left p-4 rounded-xl transition-all bg-white border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md",
                    {
                        'bg-linear-to-r from-green-50 to-emerald-50 border-green-100 hover:border-green-200': bought
                    }
                )}
            >
                <div className='absolute top-0 right-0 w-28 h-28 gradient-green rounded-full -mr-16 -mt-16 opacity-50 transition-opacity' />

                <div className='flex items-center gap-3'>
                    <button
                        onClick={handleBought}
                        type="button"
                        className={cn(
                            'rounded-full flex items-center justify-center cursor-pointer border-3 transition-colors duration-200 w-10 h-10 border-gray-400 hover:border-green-500',
                            {
                                "bg-green-400 border-green-400": bought
                            }
                        )}
                    >
                        {bought && <Check className='text-white' />}
                    </button>

                    <div>
                        <h3 className={cn('text-lg', { 'line-through text-gray-500': bought })}>
                            {item.product.name}
                        </h3>
                        <p className='text-sm text-gray-500'>{item.quantity} {item.unit}</p>
                    </div>
                </div>

                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleDelete()
                        }}
                        type="button"
                        className='rounded-full relative z-10 text-red-500 p-3 hover:bg-red-100 transition-colors duration-200 cursor-pointer'
                    >
                        <Trash2 />
                    </button>
                </div>
            </div>
        </li>
    )
}