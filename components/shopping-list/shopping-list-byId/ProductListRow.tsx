
import { IProduct } from '@/types/product';
import React from 'react';
import ProductRowItem from './ProductRowItem';


interface IProductListRow {
    products: IProduct[]
    addToList: (productId: string) => void
}
export default function ProductListRow({ products, addToList }: IProductListRow) {
    return (
        <div className='max-h-125 overflow-y-auto'>
            <ul className='flex flex-col divide-y divide-gray-100'>
              {
                products.map(el => (
                    <ProductRowItem key={el.id} addToList={addToList} item={el}/>
                ))
              }
            </ul>

        </div>
    );
}