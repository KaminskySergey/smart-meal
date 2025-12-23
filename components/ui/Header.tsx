'use client';

import React from 'react';
import { Container } from './Container';

export default function Header() {
    return (
        <header className='w-full  sticky top-0 z-70 flex flex-col items-center text-black   gradient-green  border-b border-b-black/10'>
            <Container className='flex justify-between items-center py-5'>
                <div className='bg-blue-500'>
                    logo
                </div>
                <div className='bg-amber-500'>
                    auth
                </div>
            </Container>
        </header>
    );
}