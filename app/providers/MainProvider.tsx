'use client';

import { ReactNode } from "react";



export default function MainProvider({ children }: { children: ReactNode }) {
    return (
        <div className="bg-gray-200 min-h-screen">

            
            <main className="">

                {children}
            </main>
        </div>
    );
}