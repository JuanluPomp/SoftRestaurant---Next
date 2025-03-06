"use client"

import React from 'react'
import {  ProductSchema } from '@/src/schema'
import { toast } from 'react-toastify'
import { createProduct } from '@/actions/products/create-product-action'
import { useRouter } from 'next/navigation'

export default function AddProductForm({children}: {children: React.ReactNode}) {
    const router = useRouter()
    const handleSubmit = async  (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        const result = ProductSchema.safeParse(data)
        if(!result.success){
            result.error.issues.forEach(issue => (
                toast.error(issue.message)
            ))
            return
        }
        const response = await createProduct(data)
        if(response?.errors){
            response.errors.map(issue=> {
                toast.error(issue.message)
            })
            return
        }
        toast.success('Producto creado con exito')
        console.log(result.data)
        router.push('/admin/products')
    }
  return (
    <div className=' bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto'>
        <form 
            action={handleSubmit}
            className=' space-y-5'
        >
            {children}
            <input
                className=' bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-5 p-2 uppercase font-bold cursor-pointer' 
                type="submit"
                value={'Registrar producto'}
            />
        </form>
    </div>
  )
}
