'use client';

import { IInventoryItem } from '@/types/inventory';
import { getNameFromProduct } from '@/utils/utils';

interface IInventoryStaticItem {
    item: IInventoryItem
}

export default function InventoryStaticItem({ item }: IInventoryStaticItem) {
    const { initial } = getNameFromProduct(item.product.name);

    return (
        <li className="list-none">
            <div className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors duration-200">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center justify-center w-12 h-12 shrink-0 font-bold text-indigo-600 text-xs rounded-xl bg-linear-to-br from-indigo-100 to-purple-100 shadow-sm">
                        {initial}
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 truncate">
                            {item.product.name}
                        </h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                            {item.unit}
                        </p>
                    </div>
                </div>

                <div className="ml-4 shrink-0">
                    <div className="flex items-baseline gap-1 bg-white border border-gray-200 px-2.5 py-1 rounded-lg shadow-sm">
                        <span className="font-extrabold text-sm text-gray-800">
                            {item.quantity}
                        </span>
                        <span className="text-[10px] font-medium text-gray-500">
                            {item.unit}
                        </span>
                    </div>
                </div>
            </div>
        </li>
    );
}
