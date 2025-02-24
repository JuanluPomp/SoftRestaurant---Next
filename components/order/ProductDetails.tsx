"use client"
import { products } from '@/prisma/data/products'
import { useStore } from '@/src/store'
import { OrderItem } from '@/src/types'
import { formatCurrency } from '@/src/utils'
import {XCircleIcon, PlusIcon, MinusIcon} from '@heroicons/react/24/outline'
import React, { useMemo } from 'react'

type ProductDetailsProps = {
    item: OrderItem
}

export default function ProductDetails({ item }: ProductDetailsProps) {
    const increaseQuantity = useStore(state => state.increaseQuantity)
    const decreaseQuantity = useStore(state => state.decreaseQuantity)
    const removeItem = useStore(state => state.removeItem)

    const disabledDecrease = useMemo(() => item.quantity === 1 ,[item.quantity])
    const disabledIncrease = useMemo(() => item.quantity === 10 ,[item.quantity])

    return (
        <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>

                    <button
                        className=' cursor-pointer'
                        type="button"
                        onClick={() => { removeItem(item.id) }}
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8" />
                    </button>
                </div>
                <p className="text-2xl text-amber-500 font-black">
                    {formatCurrency(item.price)}
                </p>
                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg cursor-pointer">
                    <button
                        className=' cursor-pointer disabled:opacity-20'
                        type="button"
                        onClick={() => { decreaseQuantity(item.id) }}
                        disabled={disabledDecrease}
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>

                    <p className="text-lg font-black ">
                        {item.quantity}
                    </p>

                    <button
                        className=' cursor-pointer disabled:opacity-20'
                        type="button"
                        onClick={() => { increaseQuantity(item.id)}}
                        disabled={disabledIncrease}
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>
                <p className="text-xl font-black text-gray-700">
                    Subtotal: {''}
                    <span className="font-normal">
                    {formatCurrency(item.subTotal)}
                    </span>
                </p>
            </div>
        </div>
    )
}
