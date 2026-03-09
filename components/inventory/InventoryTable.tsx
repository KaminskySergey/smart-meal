'use client';

import { IInventoryItem } from '@/types/inventory';
import { getNameFromProduct } from '@/utils/utils';
import { Check, Edit2, Package, Trash2, X } from 'lucide-react';
import InventoryTableItem from './InventoryTableItem';

interface IInventoryTable {
    items: IInventoryItem[]
    setItems: React.Dispatch<React.SetStateAction<IInventoryItem[]>>
}

export default function InventoryTable({ items, setItems }: IInventoryTable) {
    return (
        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
            <table className="w-full border-collapse text-left text-sm">
                <thead className='bg-linear-to-r gradient-purple text-white'>
                    <tr>
                        <th className='px-6 py-4 font-semibold'>Product</th>

                        <th className='px-6 py-4 font-semibold text-left'>Quantity</th>
                        <th className='px-6 py-4 font-semibold text-right'>Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {items.map(item =>
                        <InventoryTableItem setItems={setItems} key={item.id} item={item} />)}
                </tbody>
            </table>
        </div>
    );
}