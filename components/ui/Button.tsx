'use client';

import { cn } from '@/utils/utils';
import React from 'react';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode,
    className?: string
    isAuth?: boolean
}
export default function Button({ children, isAuth, className, ...props }: IButton) {
    return (
        <button  className={cn(
            "px-4 py-2 cursor-pointer rounded-xl font-medium transition-all duration-200 bg-green-500 text-white hover:bg-green-700", {
                "bg-blue-600  hover:bg-blue-700": isAuth
            },
            className
        )} {...props}>
            {children}
        </button>
    );
}