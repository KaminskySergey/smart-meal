'use client';

import RightContainer from '@/components/ui/RightContainer';
import React, { ChangeEvent, useState } from 'react';
import { Funnel, Search } from 'lucide-react';
import { ICategory, ISubCategory } from '@/types/category';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IProduct } from '@/types/product';
import ProductListRow from './ProductListRow';
import toast from 'react-hot-toast';
import { addProductToShoppingList } from '@/action/shopping-list';
import { IShoppingListItem } from '@/types/shopping-list';


interface IAddProductsToList {
    categories: ICategory[]
    products: IProduct[]
    setItems: React.Dispatch<React.SetStateAction<IShoppingListItem[]>>
}

export default function AddProductsToList({ categories, products , setItems }: IAddProductsToList) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = useParams()
    const { listId } = useParams<{ listId: string }>();

    const defaultCategoryId = searchParams.get('categoryId') || null;
    const defaultSubCategoryId = searchParams.get('subcategoryId') || null;
    const defaultSearchTerm = searchParams.get('searchTerm') ?? '';

    const [searchTerm, setSearchTerm] = useState<string>(defaultSearchTerm)
    const [quantity, setQuantity] = useState<number>(0)
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(defaultCategoryId)
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(defaultSubCategoryId)


    const selectedCategory = categories.find(c => c.id === selectedCategoryId);

    const handleAddProductToList = async (productId: string) => {
        if (quantity === 0) {
            toast.error("Cannot add product: quantity is 0");
            return;
        }

        try {
            const newItem = await addProductToShoppingList(productId, quantity, listId);
            console.log(newItem, 'mmmmmmmmmmmmmmmmmmm')
            setItems(prev => [...prev, newItem])
            toast.success("Product successfully added to your shopping list!");
        } catch (error: unknown) {
            let message = "Failed to add product. Please try again.";

            if (error instanceof Error) {
                message = error.message;
            }

            toast.error(message);
        }
    }

    const handleCategoryChange = (categoryId: string | null) => {
        const params = new URLSearchParams(searchParams)
        setSelectedCategoryId(categoryId)
        setSelectedSubCategoryId(null)
        if (categoryId) {
            params.set('categoryId', categoryId);
        } else {
            params.delete('categoryId');
        }
        params.delete('subcategoryId');
        replace(`${pathname}?${params.toString()}`);
    }
    const handleSubCategoryChange = (subcategoryId: string | null) => {
        const params = new URLSearchParams(searchParams)
        setSelectedSubCategoryId(subcategoryId)

        if (subcategoryId) {
            params.set('subcategoryId', subcategoryId);
        } else {
            params.delete('subcategoryId');
        }
        replace(`${pathname}?${params.toString()}`);
    }


    const handleDeleteParams = () => {
        const params = new URLSearchParams(searchParams)
        params.delete('categoryId');
        params.delete('subcategoryId');
        params.delete('searchTerm');

        setSelectedCategoryId(null);
        setSelectedSubCategoryId(null);
        setSearchTerm('')

        replace(pathname);

        replace(`${pathname}?${params.toString()}`);
    }

    const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams)
        setSearchTerm(value)

        if (value) {
            params.set('searchTerm', value);
        } else {
            params.delete('searchTerm');
        }
        replace(`${pathname}?${params.toString()}`);
    }



    return (
        <RightContainer title='Add Products'>
            <div className='p-4 flex flex-col gap-4'>
                <div className='relative'>
                    <input onChange={handleSearchTerm} type="text" name='name' value={searchTerm} placeholder='Search products' className='px-4 py-3 pl-9 w-full border rounded-2xl bg-gray-50 border-gray-300 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                                   focus:border-blue-500 transition'/>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                </div>
                <div>
                    <div className='flex items-center justify-between'>
                        <p className='text-base font-bold text-gray-600 flex items-center'><Funnel className='mr-2' /> Filters</p>
                        {(defaultCategoryId || defaultSubCategoryId) && (
                            <button
                                onClick={handleDeleteParams}
                                type="button"
                                className='text-blue-600 cursor-pointer transition-transform duration-200 hover:underline text-base font-bold'
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>
                {/* category */}
                <div>
                    <select
                        value={selectedCategoryId ?? ''}
                        onChange={(e) => handleCategoryChange(e.target.value || null)}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50
             focus:outline-none focus:ring-2 focus:ring-blue-500
             focus:border-blue-500 transition"
                    >
                        <option value="">All categories</option>
                        {
                            categories.map(el => (
                                <option value={el.id} key={el.id}>{el.name}</option>
                            ))
                        }
                    </select>
                </div>
                {/* subcategory */}
                {selectedCategoryId && <div>
                    <select
                        value={selectedSubCategoryId ?? ''}
                        onChange={(e) => handleSubCategoryChange(e.target.value || null)}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50
             focus:outline-none focus:ring-2 focus:ring-blue-500
             focus:border-blue-500 transition"
                    >
                        <option value="">All subcategories</option>
                        {
                            selectedCategory?.subcategory.map(el => (
                                <option value={el.id} key={el.id}>{el.name}</option>
                            ))
                        }
                    </select>
                </div>}

                <div>
                    <label className='text-base font-bold text-gray-600' htmlFor="quantity">Quantity</label>
                    <input id='quantity' onChange={(e) => {
                        const value = e.target.value;
                        setQuantity(value === '' ? 0 : Number(value));
                    }} type="number" min={0} step={0.1} value={quantity} className="w-full px-4 py-3 mt-2 rounded-2xl border border-gray-300 bg-gray-50
             focus:outline-none focus:ring-2 focus:ring-blue-500
             focus:border-blue-500 transition"/>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                    <p className='text-sm font-semibold text-gray-600 mb-3'>{products.length > 0
                        ? `Found ${products.length} products`
                        : 'Found 0 products'}</p>
                </div>
            </div>
            <div>
                {products.length !== 0 && <ProductListRow addToList={handleAddProductToList} products={products} />}
                {products.length === 0 && <div className='flex flex-col items-center pb-6'>
                    <h3 className=' text-gray-600  mb-3'>No products found</h3>
                    <button
                        onClick={handleDeleteParams}
                        type="button"
                        className='text-blue-600 cursor-pointer transition-transform duration-200 hover:underline text-base font-bold'
                    >
                        Reset
                    </button>
                </div>}
            </div>
        </RightContainer>
    );
}

