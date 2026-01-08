'use client';

import React from 'react';

export default function TextDivider({ title }: { title: string }) {
    return (
        <div className="flex w-full items-center gap-4">
            <div className="h-px bg-gray-300 dark:bg-white/10 w-full">
            </div>
            <p className="min-w-fit text-sm font-medium text-neutral-600 dark:text-dm-neutral-600">{title}</p>
            <div className="h-px bg-gray-300 dark:bg-white/10 w-full">

            </div>
        </div>
    );
}