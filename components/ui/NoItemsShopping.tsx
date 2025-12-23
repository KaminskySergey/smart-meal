'use client';

import Image from 'next/image';
import React from 'react';

interface INoItemsShopping {
    title: string
}

export default function NoItemsShopping({title}: INoItemsShopping) {
    return (
        <div className="w-full min-h-[60vh] bg-white rounded-2xl flex flex-col justify-center items-center shadow-lg p-6">
           
            <div className="relative w-70 h-70 sm:w-95 sm:h-95">
                <Image
                    src="/no-items.webp"
                    alt="No items"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
                {title}
            </h2>
        </div>
    );
}