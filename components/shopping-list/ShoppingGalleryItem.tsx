
import { IShoppingList } from '@/types/shopping-list';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { removeShoppingListById } from '@/action/shopping-list';
import toast from 'react-hot-toast';
import { useState } from 'react';
import ProgressBar from '../ui/ProgressBar';
import { useProgressBar } from '@/hooks/useProgressBar';
interface IShoppingGalleryItem {
    item: IShoppingList
}

export default function ShoppingGalleryItem({ item }: IShoppingGalleryItem) {
    const [isDeleted, setIsDeleted] = useState(false);

    const formattedDate = format(item.createdAt, 'd MMMM yyyy');

    const { boughtCount, totalCount, progressPercent } = useProgressBar(item.items)

    const handleDelete = async () => {
        try {
            await removeShoppingListById(item.id)
            toast.success('Shopping list removed')
        } catch (error) {
            toast.error('Something erorr')
        }
    }

    return (

        <li>
            <Link href={`/shopping-list/${item.id}`}>
                <div className='rounded-2xl relative overflow-hidden bg-white  p-6 text-black shadow-lg transition-transform duration-300 hover:scale-105'>
                    <div className='absolute top-0 right-0 w-32 h-32 gradient-green rounded-full -mr-16 -mt-16 opacity-50  transition-opacity' />
                    <button onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete()
                    }} type="button" className='rounded-full absolute top-2 right-2 text-red-500 p-3 hover:bg-red-100 transition-colors duration-200 cursor-pointer'>
                        <Trash2 />
                    </button>

                    <div className=''>
                        <h3 className='text-2xl font-bold'>{item.name}</h3>
                        <div className='mt-3'>
                            <div className='flex items-center justify-between'>
                                <p className='font-medium text-lg'>Progress</p>
                                <p>{boughtCount}/{totalCount}</p>
                            </div>
                            <ProgressBar percent={progressPercent} />
                        </div>
                        <p className='text-gray-400 mt-4'>{formattedDate}</p>
                    </div>
                </div>
            </Link>
        </li>
    );
}