'use client';

import React from 'react';

interface IRightContainer {
    children: React.ReactNode,
    title: string
}

export default function RightContainer({children, title}: IRightContainer) {
  return (
    <div className='rounded-2xl bg-white shadow-lg overflow-hidden'>
            <div className='gradient-purple text-white font-bold text-2xl px-4 py-5'>
                {title}
            </div>
      {children}
    </div>
  );
}