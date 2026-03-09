'use client';

import Image from 'next/image';
import { Container } from './Container';
import DropdownMenu from './DropdownMenu';
import { useDropdownMenu } from '@/hooks/useDropdownMenu';
import HeaderNavigation from './HeaderNavigation';
import { useSession } from 'next-auth/react';
import { getNameFromProduct } from '@/utils/utils';

export default function Header() {
    const { menuRef,
        handleToggleMenu,
        isActiveMenu } = useDropdownMenu()

    const session = useSession()
    const { initial } = getNameFromProduct(session.data?.user?.name || "User")
    return (
        <header className='w-full sticky top-0 z-70 flex items-center gradient-green border-b border-black/10 h-16'>
            <Container className='flex justify-between items-center h-full'>
                <div className='font-bold text-xl'>
                    Smart<span className='text-purple-600'>Meal</span>
                </div>

                {session.status === "authenticated" &&

                    <>
                        <HeaderNavigation />
                        <div ref={menuRef} className='relative cursor-pointer' onClick={handleToggleMenu}>
                            {session.data.user?.image ? <div className='relative h-12 w-12 ' >
                                <Image fill className=" rounded-full"
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                                    alt="avatar" />
                            </div>
                                : <div className='text-white flex items-center justify-center  w-12 h-12 font-medium text-lg rounded-full bg-linear-to-r from-purple-500 to-pink-500'>
                                    {initial}
                                </div>}
                            {isActiveMenu && <DropdownMenu />}
                        </div>
                    </>}
            </Container>
        </header>
    );
}