'use client';

import React from 'react';
import Button from './Button';
import { Plus } from 'lucide-react'
import { useToggle } from '@/hooks/useToggle';
import Modal from './Modal';
import ModalCreateInput from './ModalCreateInput';
interface ITitleWithAction {
    title: string
    titleBtn?: string

}

export default function TitleWithAction({ title, titleBtn }: ITitleWithAction) {
    const { isToggle, handleToggle } = useToggle()
    return (
        <>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-2xl md:text-4xl text-black'>{title}</h1>
                </div>
                <div>




                    <Button
                        onClick={handleToggle}
                        type="button"
                        className="flex items-center gap-2 text-heading bg-linear-to-r from-teal-200 to-lime-200 hover:bg-linear-to-l  hover:scale-105  hover:from-teal-200 hover:to-lime-200 focus:outline-none  font-bold rounded-2xl text-xl px-8 py-4 text-center leading-6 shadow-lg"
                    >
                        <Plus /> {titleBtn}
                    </Button>


                </div>
            </div>
            {isToggle && <Modal onClose={handleToggle}>
                <ModalCreateInput handleToggle={handleToggle} placeholder='Name List' title='New Shopping List' />
            </Modal>}
        </>
    );
}