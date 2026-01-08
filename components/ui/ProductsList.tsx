'use client';

import React from 'react';

export default function ProductsList({ children }: { children: React.ReactNode }) {
    return (
        <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full p-4'>
            {children}
        </ul>
    );
}