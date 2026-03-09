'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface IViewCardBanner {
    href: string,
    subCategoryName: string
}

export default function ViewCardBanner({href, subCategoryName}: IViewCardBanner) {
    return (
        <li className="list-none">
            <Link href={href} className="group block h-full">
                <div className="h-full min-h-55 p-6 rounded-2xl border-2 border-dashed border-green-200 
                        bg-green-50/50 flex flex-col items-center justify-center gap-4 
                        transition-all duration-300 hover:bg-green-100 hover:border-green-400 
                        hover:shadow-lg active:scale-95">

                    <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center 
                          shadow-md transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-110">
                        <ArrowRight size={24} />
                    </div>

                    <div className="text-center">
                        <p className="text-green-700 font-bold text-lg">View All</p>
                        <p className="text-green-600/70 text-sm font-medium">{subCategoryName}</p>
                    </div>
                </div>
            </Link>
        </li>
    );
}