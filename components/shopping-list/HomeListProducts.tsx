'use client';

import { ArrowRight, House } from 'lucide-react';
import RightContainer from '../ui/RightContainer';
import { IInventoryItem } from '@/types/inventory';
import InventoryStaticItem from './shopping-list-byId/InventoryStaticItem';
import Link from 'next/link';

interface IHomeListProducts {

    inventoryItems: IInventoryItem[]
}

export default function HomeListProducts({ inventoryItems }: IHomeListProducts) {

    return (
        <RightContainer title='Your Inventory'>
        {inventoryItems.length === 0 ? (
            <div className='flex flex-col items-center justify-center gap-4 py-12 px-6 text-center'>
                <div className='w-20 h-20 flex items-center justify-center rounded-full bg-linear-to-br from-purple-100 to-pink-100 shadow-inner'>
                    <House className='w-10 h-10 text-purple-500/70' />
                </div>
                <div>
                    <p className='text-lg font-bold text-gray-900'>Inventory is empty</p>
                    <p className='text-sm text-gray-400 mt-1'>Add items to track what you have at home</p>
                </div>
            </div>
        ) : (
            <div className='flex flex-col'>
                <div className='max-h-125 overflow-y-auto pr-1 custom-scrollbar'>
                    <ul className='flex flex-col divide-y divide-gray-100'>
                        {inventoryItems.map((item) => (
                            <InventoryStaticItem key={item.id} item={item} />
                        ))}
                    </ul>
                </div>

                <div className='mt-2 pt-4 '>
                    <Link 
                        href="/inventory" 
                        className='group flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-200 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600  transition-all duration-200'
                    >
                        <span className='text-sm font-bold tracking-wide'>View Full Inventory</span>
                        <ArrowRight 
                            size={16} 
                            className='transition-transform duration-200 group-hover:translate-x-1' 
                        />
                    </Link>
                    
                    
                </div>
            </div>
        )}
    </RightContainer>
    );
}