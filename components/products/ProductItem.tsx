'use client';

import { IProduct } from '@/types/product';
import { getNameFromProduct } from '@/utils/utils';
import React from 'react';


interface IProductItem {
    product: IProduct
}
export default function ProductItem({ product }: IProductItem) {
    const { initial } = getNameFromProduct(product.name)
    return (
        <li className="group list-none">
            <div className='p-3 bg-white rounded-2xl shadow-sm border border-slate-100 
                        flex flex-col gap-3 transition-all duration-300 
                        hover:shadow-xl hover:-translate-y-1 hover:border-purple-200 active:scale-95 cursor-pointer'>

                <div className='relative overflow-hidden flex items-center justify-center font-semibold text-2xl 
                rounded-xl h-40 bg-linear-to-br from-emerald-100 to-green-100 
                text-green-700 group-hover:scale-105 transition-transform duration-500'>
                    {initial}

                    <div className='absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity' />
                </div>

                <div className='flex flex-col gap-1 px-1 pb-1'>
                    <h2 className='text-sm sm:text-base font-semibold text-slate-800 line-clamp-2 min-h-10 leading-tight'>
                        {product.name}
                    </h2>
                    <span className='text-xs text-slate-400 font-normal uppercase tracking-wider'>
                        Unit: {product.unit}
                    </span>
                </div>
            </div>
        </li>
    );
}