'use client';

import { Container } from '@/components/ui/Container';
import React from 'react';
import TitleProductsPage from '../TItleProductsPage';
import { ICategory } from '@/types/category';


import CategoryItem from './CategoryItem';

interface ICategoryComponent {
    categories: ICategory[]
}

export default function CategoryComponent({ categories }: ICategoryComponent) {
console.log(categories, '11111111')
    return (
        <section className='py-16'>
            <Container className='max-w-3xl'>
                <TitleProductsPage title='Categories' subTitle='Browse product categories to quickly find the product you`re looking for' />
                <ul className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12'>
                    {
                        categories.map(el => (
                            <CategoryItem key={el.id} category={el} />
                        ))
                    }
                </ul>
            </Container>
        </section>
    );
}