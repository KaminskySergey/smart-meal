'use client'
import { FormEvent, useActionState, useCallback, useEffect, useState } from 'react';
import Button from './Button';
import { createShoppingListAction } from '@/action/shopping-list';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

interface IModalCreateInput {
  placeholder: string
  title: string
  handleToggle: () => void

}

export default function ModalCreateInput({ placeholder, title, handleToggle }: IModalCreateInput) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      await createShoppingListAction(formData);

      handleToggle(); 
    } catch (err) {
    } finally {
      setPending(false);
    }
  };

  return (
    <form className='w-120' onSubmit={handleSubmit}>
      <div className='py-4  px-4 gradient-green'>
        <h2 className='text-xl font-bold text-black'>{title}</h2>
      </div>
      <div className='flex flex-col p-4 gap-4'>
        <div>
          <input type="text" name='name' required placeholder={placeholder} className="px-4 py-3 w-full border rounded-lg bg-gray-50 border-gray-300 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                                   focus:border-blue-500 transition"/>
        </div>
        <div className='flex items-center  justify-end gap-2'>
          <Button type="button" onClick={handleToggle} className='bg-transparent hover:bg-red-500 text-black hover:text-white'>Cancel</Button>
          <Button type="submit">{pending ? "Creating..." : "Create"}</Button>
        </div>
      </div>
    </form>
  );
}