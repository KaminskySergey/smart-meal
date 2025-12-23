'use client';

import { IProduct } from '@/types/product';
import { getAvatarDataFromName, getNameFromProduct } from '@/utils/utils';
import { Plus } from 'lucide-react';
import React from 'react';

interface IProductRowItem {
    item: IProduct
    addToList: (productId: string) => void
}

export default function ProductRowItem({ item, addToList }: IProductRowItem) {
    const { initial } = getNameFromProduct(item.name)
    return (
        <li>
            <div onClick={() => addToList(item.id)} className='flex items-center justify-between group transition-colors duration-300 cursor-pointer hover:bg-blue-50 p-4'>
                <div className='flex items-center justify-between gap-3'>
                    <div className=' flex items-center justify-center  w-12 h-12 font-medium text-lg rounded-xl bg-linear-to-r from-purple-200 to-pink-200'>
                        {initial}
                    </div>
                    <div className=''>
                        <h4 className='font-medium text-base group-hover:text-blue-500 text-black'>{item.name}</h4>
                        <p className='text-sm text-gray-500'>{item.unit}</p>
                    </div>
                </div>
                <div>
                    <Plus className='text-gray-500 group-hover:text-blue-500'/>
                </div>
            </div>
        </li>
    );
}