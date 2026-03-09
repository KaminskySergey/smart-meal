'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';


export default function NoProducts() {
    return (
        <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
            <p className="text-gray-500 max-w-xs mt-2">
                Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
            <Link
                href="/products"
                className="mt-6 text-green-600 font-medium hover:underline"
            >
                Clear all filters
            </Link>
        </div>
    );
}