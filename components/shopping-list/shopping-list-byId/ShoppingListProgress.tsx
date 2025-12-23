'use client';

import { Container } from '@/components/ui/Container';
import ProgressBar from '@/components/ui/ProgressBar';
import { useProgressBar } from '@/hooks/useProgressBar';
import { IShoppingListItem } from '@/types/shopping-list';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface IShoppingListProgress {
    nameList: string,
    items: IShoppingListItem[]
}

export default function ShoppingListProgress({ nameList, items }: IShoppingListProgress) {
    const { boughtCount, totalCount, progressPercent } = useProgressBar(items)
    return (
        <section className="bg-white py-4 px-6 mb-8 shadow-sm rounded-md">
            <Container className='flex flex-col justify-center gap-4'>
                <div className='flex items-center'>
                    <Link href={'/shopping-list'} className='mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors'>
                        <ArrowLeft className="w-7 h-7" />
                    </Link>
                    <div className='flex flex-col gap-1'>
                        <h2 className='font-bold text-xl'>{nameList}</h2>
                        <div>
                            <span className="text-gray-500 mr-3">{totalCount} items</span>
                            <span className="text-green-500">{boughtCount} purchased</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='text-gray-500 flex items-center justify-between'>
                        <p >Shopping progress</p>
                        <p>{progressPercent}%</p>
                    </div>
                    <ProgressBar isSection percent={progressPercent} />
                </div>
            </Container>
        </section>
    );
}