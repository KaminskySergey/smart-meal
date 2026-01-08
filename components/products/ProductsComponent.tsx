'use client';

import { IProduct } from '@/types/product';
import React, { Suspense } from 'react';
import TitleProductsPage from './TItleProductsPage';
import { Container } from '../ui/Container';
import ProductsList from '../ui/ProductsList';
import ProductItem from './ProductItem';
import Pagination from '../ui/Pagination';
import TextDivider from '../ui/TextDivider';
import Button from '../ui/Button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface IProductsComponent {
    products: IProduct[]
    totalPages: number
}


export default function ProductsComponent({ products, totalPages }: IProductsComponent) {
    return (
        <>
            <section className="pt-16 pb-12">
                <Container className="flex flex-col items-center text-center gap-6">
                    <TitleProductsPage
                        title="Products"
                        subTitle="Tap on a product to learn more about its nutrients, uses, and storage tips"
                    />
                </Container>
            </section>

            <section className='pb-16'>
                <Container className="max-w-5xl flex flex-col items-center gap-1">

                    <div className='mb-6'>
                        <Link href={'/products/category'} className='flex items-center px-4 py-2 cursor-pointer rounded-xl font-medium transition-all duration-200 bg-green-500 text-white hover:bg-green-700'>
                            browse categories <ChevronRight />
                        </Link>
                    </div>
                    <div className="w-full">
                        <TextDivider title="All Products" />
                    </div>



                    <ProductsList>
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </ProductsList>


                    <div className="mt-3 flex justify-center">
                        <Pagination totalPages={totalPages} />
                    </div>

                </Container>
            </section>
        </>
    );
}