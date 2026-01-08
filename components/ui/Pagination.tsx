'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';


export const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 6) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, 4, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const allPages = generatePagination(currentPage, totalPages);

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <nav className="flex items-center justify-center mt-12 select-none">
        
        <div className="flex items-stretch bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            
            
            <Link
                href={createPageURL(currentPage - 1)}
                className={`flex items-center justify-center w-12 h-12 transition-colors border-r border-slate-200 
                    ${currentPage <= 1 ? 'pointer-events-none bg-slate-50 text-slate-300' : 'hover:bg-slate-50 text-slate-600'}`}
            >
                <ChevronLeft size={18} />
            </Link>

           
            <ul className="flex items-center">
                {allPages.map((page, index) => {
                    const isEllipsis = page === '...';
                    const isActive = currentPage === page;

                    return (
                        <li key={index} className="flex items-center h-full">
                            {isEllipsis ? (
                                <span className="flex items-center justify-center w-10 h-full text-slate-400 bg-slate-50/50 border-r border-slate-200 text-xs">
                                    •••
                                </span>
                            ) : (
                                <Link
                                    href={createPageURL(page)}
                                    className={`flex h-12 w-12 items-center justify-center text-sm font-semibold transition-all border-r border-slate-200 last:border-r-0
                                        ${isActive 
                                            ? 'bg-green-600 text-white shadow-inner' 
                                            : 'text-slate-600 hover:bg-green-50 hover:text-green-700'
                                        }`}
                                >
                                    {page}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>

           
            <Link
                href={createPageURL(currentPage + 1)}
                className={`flex items-center justify-center w-12 h-12 transition-colors border-l border-slate-200
                    ${currentPage >= totalPages ? 'pointer-events-none bg-slate-50 text-slate-300' : 'hover:bg-slate-50 text-slate-600'}`}
            >
                <ChevronRight size={18} />
            </Link>
        </div>
    </nav>
    );
}