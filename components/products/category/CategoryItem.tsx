'use client';

import { ICategory } from '@/types/category';
import { getAvatarDataFromName } from '@/utils/utils';
import Link from 'next/link';

export default function CategoryItem({ category }: { category: ICategory }) {
    const { initials, bgColor } = getAvatarDataFromName(category.name)
    return (
        <li key={category.id}>
            <Link href={`/products/category/${category.slug}`}>
                <div className="group flex items-center bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden 
                                transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group:scale-105">

                    <div
                        style={{ backgroundColor: bgColor }}
                        className="relative shrink-0 flex items-center justify-center font-bold text-2xl 
                                   h-24 w-24 sm:h-32 sm:w-32 text-white transition-transform duration-500 
                                   "
                    >
                        {initials}
                        <div className="absolute inset-0 bg-linear-to-tr from-black/10 to-transparent opacity-50" />
                    </div>

                    <div className="flex flex-col px-6 py-4 overflow-hidden">
                        <p className="text-lg font-bold text-slate-800 md:text-xl truncate group-hover:text-green-600 transition-colors">
                            {category.name}
                        </p>
                        
                    </div>
                </div>
            </Link>
        </li>
    );
}