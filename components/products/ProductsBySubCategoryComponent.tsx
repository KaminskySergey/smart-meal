'use client';

import React from 'react';
import { Container } from '../ui/Container';
import Pagination from '../ui/Pagination';
import { IProduct } from '@/types/product';
import ProductItem from './ProductItem';
import TitleProductsPage from './TItleProductsPage';
import ProductsList from '../ui/ProductsList';

interface IProductsBySubCategoryComponent {
    products: IProduct[]
    totalPages: number
    subCategoryName: string | null
}

export default function ProductsBySubCategoryComponent({ products, totalPages, subCategoryName }: IProductsBySubCategoryComponent) {
    return (
        <section className='py-16'>
            <Container className='flex flex-col gap-6 max-w-3xl'>
                {subCategoryName && <TitleProductsPage title={subCategoryName} />}
                <ProductsList >
                    {
                        products.map(el => (
                            <ProductItem product={el} />
                        ))
                    }
                </ProductsList>
            </Container>
            {totalPages > 20 && <Container>
                <Pagination totalPages={totalPages} />
            </Container>}
        </section>
    );
}