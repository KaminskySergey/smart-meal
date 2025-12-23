'use client';

import { House } from 'lucide-react';
import RightContainer from '../ui/RightContainer';

export default function HomeListProducts() {

    return (
        <RightContainer title='Your Inventory'>


            <div className='flex flex-col items-center gap-3 py-8 px-4'>
                <div className='w-24 h-24 flex items-center justify-center rounded-full bg-linear-to-br from-purple-100 to-pink-100'>
                    <House className='w-12 h-12 text-purple-500' />
                </div>
                <p className='text-xl font-medium'>Inventory is empty</p>
            </div>
            {/* <ul className='flex flex-col p-4'>
            
        </ul> */}
        </RightContainer>
    );
}