"use client"

import { Product } from '@prisma/client'
import React from 'react'
import { useStore } from '@/src/store'

type AddProductButtonProps={
    product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder)
  return (
    <button
        onClick={() =>addToOrder(product)}
        className=' bg-indigo-600 hover:bg-indigo-700 cursor-pointer border rounded-md text-xl text-white font-bold p-2 w-full mt-5'
    >Agregar</button>
  )
}
