import Heading from '@/components/ui/Heading'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className=' text-center space-y-5 mt-20'>
        <Heading>Producto no encontrado</Heading>
        <Link
            href='/admin/products'
            className=' text-center font-bold px-5 py-3 bg-amber-400 rounded-lg w-full lg:w-auto cursor-pointer hover:bg-amber-500'
        >Regresar a productos</Link>
    </div>
  )
}
