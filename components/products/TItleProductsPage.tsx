'use client';

import React from 'react';

interface ITitleProductsPage {
    title: string
    subTitle: string
}

export default function TitleProductsPage({title, subTitle}: ITitleProductsPage) {
    return (
        <div className='text-center'>
            <h1 className='text-2xl font-extrabold text-neutral-900  md:text-4xl'>{title}</h1>
            <p className='mt-4 max-w-96 text-base font-medium leading-6 text-neutral-600 dark:text-dm-neutral-600 md:max-w-full md:text-xl md:font-normal md:leading-8'>{subTitle}</p>
        </div>
    );
}