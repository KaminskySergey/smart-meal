'use client';

import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchProducts() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const querySearch = searchParams.get('search')?.toString() || '';

    const handleSearch = useDebouncedCallback((term) => {

        const params = new URLSearchParams(searchParams)
        params.set('page', '1');
        if (term) {
            params.set('search', term)
        } else {
            params.delete('search')
        }
        replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }, 300);

    const handleClear = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('search');
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    return (
        <div className="relative w-91 max-w-md group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
                key={querySearch}
                type="text"
                placeholder="Search for a product..."
                defaultValue={querySearch}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl 
                       text-gray-900 placeholder:text-gray-400 outline-none
                       transition-all duration-200
                       focus:border-green-500 focus:ring-4 focus:ring-green-500/10 
                       hover:border-gray-300"
            />
            {querySearch && <button
                onClick={handleClear}
                className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500"
            >
                <X className="h-5 w-5" />
            </button>}
        </div>
    );
}