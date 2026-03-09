'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navigation = [
    { href: '/', title: "Home" },
    { href: '/shopping-list', title: "Shopping List" },
    { href: '/inventory', title: "Inventory" },
]

export default function HeaderNavigation() {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <nav className='hidden md:flex gap-6 font-medium'>

            <ul className="text-white md:flex hidden items-center gap-10">
                {
                    navigation.map((el, idx) => {
                        const isActive = pathname === el.href;

                        return (
                            <li key={idx}>
                                <Link
                                    href={el.href}
                                    className={`
                                    px-4 py-2 rounded-full transition-all duration-300 font-bold
                                    ${isActive
                                            ? 'bg-white/40 text-emerald-950 shadow-sm' 
                                            : 'text-emerald-900 hover:bg-white/20'   
                                        }
                                `}
                                >
                                    {el.title}
                                </Link>
                            </li>
                        );
                    })
                }


            </ul>
        </nav>
    );
}