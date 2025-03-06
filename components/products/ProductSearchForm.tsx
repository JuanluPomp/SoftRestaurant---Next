"use client"

import { ProductSearchSchema } from '@/src/schema'
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function ProductSearchForm() {

    const router = useRouter()

    const handleSearchForm = (formData : FormData)=>{
        const data = {
            search: formData.get('search')
        }
        const result = ProductSearchSchema.safeParse(data)
        if(!result.success){
            result.error.issues.map(issue => {
                toast.error(issue.message)
            })
            return
        }
        router.push(`/admin/products/search?search=${data.search}`)
    }
  return (
    <form
        action={handleSearchForm} 
        className=' flex items-center'>
        <input
            type="text"
            placeholder='Buscar producto'
            className=' p-2 bg-white placeholder-gray-400 w-full'
            name='search'
        />
        <input 
            type="submit"
            className=' bg-indigo-600 hover:bg-indigo-700 cursor-pointer p-2 uppercase text-white'
            value={'Buscar'}
        />
    </form>
  )
}
