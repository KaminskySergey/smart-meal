'use client';

import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='min-h-screen bg-linear-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-8'>
            {children}
        </main>
    );
}