'use client';

import { cn } from '@/utils/utils';
import React from 'react';

interface IProgressBar {
    percent: number
    isSection?: boolean
}

export default function ProgressBar({ percent, isSection }: IProgressBar) {
    return (
        <div className='w-full h-2 bg-gray-200 overflow-hidden rounded-2xl mt-2'>
            <div
                className={cn("bg-green-500 h-2 transition-all duration-500 ease-in-out", {
                    "h-4": isSection
                })}
                style={{ width: `${percent}%` }}
            />
        </div>
    );
}