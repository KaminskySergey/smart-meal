'use client';
import { changeQuantityInventoryItem, deleteInventoryItem } from '@/action/inventory';
import { IInventoryItem } from '@/types/inventory';
import { getNameFromProduct } from '@/utils/utils';
import { Check, Edit2, Package, Trash2, X } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface IInventoryTableItem {
    item: IInventoryItem
    setItems: React.Dispatch<React.SetStateAction<IInventoryItem[]>>
}

export default function InventoryTableItem({ item, setItems }: IInventoryTableItem) {
    const [quantity, setQuantity] = useState(item.quantity)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const { initial } = getNameFromProduct(item.product.name)

    const handleEdit = () => {
        if (isEdit) setQuantity(item.quantity);
        setIsEdit(prev => !prev)
    }

    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value))
    }

    const handleUpdate = async () => {
        try {
            await changeQuantityInventoryItem(item.id, quantity)
            setIsEdit(false)
            toast.success('Inventory updated successfully')
        } catch (error) {
            toast.error('Failed to update inventory')
        }
    }

    const handleDelete = async () => {
        try {
            await deleteInventoryItem(item.id)
            setItems(prev => prev.filter(el => el.id !== item.id))
            toast.success('Product successfully deleted from your inventory list')
        } catch (error) {
            toast.error('Something went wrong. Please try again.')
        }
    }

    return (


        <tr className="group transition-all duration-200 hover:bg-slate-50/80 border-b border-gray-100 last:border-0">
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className='flex items-center justify-center w-11 h-11 font-bold text-indigo-600 text-sm rounded-xl bg-linear-to-br from-indigo-100 to-purple-100 shadow-sm'>
                        {initial}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 text-sm">{item.product.name}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                            {item.unit}
                        </div>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 text-left">
                <div className="flex items-center gap-3">
                    <div className={`
            flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all
            ${isEdit ? 'bg-white border-indigo-400 ring-2 ring-indigo-50 shadow-sm' : 'bg-gray-200/50 border-transparent'}
        `}>
                        <input
                            onChange={handleQuantity}
                            type='number'
                            step='1'
                            disabled={!isEdit}
                            className="font-bold w-14 text-gray-800 bg-transparent outline-none text-center disabled:text-gray-500"
                            value={quantity}
                        />
                        
                    </div>

                    <div className="w-17.5 flex items-center">
                        {isEdit ? (
                            <div className='flex items-center gap-1.5 animate-in fade-in zoom-in duration-200'>
                                <button
                                    onClick={handleUpdate}
                                    className='p-1.5 cursor-pointer bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 shadow-sm'
                                >
                                    <Check size={16} strokeWidth={3} />
                                </button>
                                <button
                                    onClick={handleEdit}
                                    className='p-1.5 cursor-pointer bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300'
                                >
                                    <X size={16} strokeWidth={3} />
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="flex justify-end gap-1">
                    {!isEdit && (
                        <button
                            onClick={handleEdit}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="Изменить количество"
                        >
                            <Edit2 size={18} />
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Удалить"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    )
}