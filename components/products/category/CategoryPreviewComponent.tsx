'use client';

import { Container } from '@/components/ui/Container';

import TitleProductsPage from '../TItleProductsPage';
import { ICategoryPreview } from '@/types/category';


import ProductItem from '../ProductItem';
import ViewCardBanner from './ViewCardBanner';

interface ICategoryPreviewComponent {
    category: ICategoryPreview
}

export default function CategoryPreviewComponent({ category }: ICategoryPreviewComponent) {
    return (
        <section className='py-16'>
             <Container className='max-w-3xl'>
                <TitleProductsPage title={category.name} />
                <ul className='flex flex-col gap-8 w-full'>
                    {category.subcategory.map(sub => (
                        <li key={sub.id}>
                            <div className="flex items-center justify-between pb-4">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                                    {sub.name}
                                </h2>
                            </div>
                            <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                                {sub.products.map(product => (
                                    <ProductItem key={product.id} product={product} />
                                ))}
                                <ViewCardBanner 
                                    href={`/products/category/${category.slug}/${sub.slug}`} 
                                    subCategoryName={sub.name} 
                                />
                            </ul>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}