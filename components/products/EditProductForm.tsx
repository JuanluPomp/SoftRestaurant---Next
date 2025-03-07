"use client"
  
import React from 'react'
import {  ProductSchema } from '@/src/schema'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { editProductById } from '@/actions/products/edit-product-action'

export default function EditProductForm({children}: {children: React.ReactNode}) {
    const router = useRouter()
    const params = useParams()
    const id = +params.id!
    const handleSubmit = async  (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        console.log(data)
        const result = ProductSchema.safeParse(data)
        if(!result.success){
            result.error.issues.forEach(issue => (
                toast.error(issue.message)
            ))
            return
        }
        const response = await editProductById(result.data, id)
        if(response?.errors){
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
        }
         
        toast.success('Producto editado exitosamente')
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
                value={'Guardar cambios'}
            />
        </form>
    </div>
  )
}
