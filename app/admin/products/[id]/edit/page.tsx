import EditProductForm from '@/components/products/EditProductForm'
import ProductForm from '@/components/products/ProductForm'
import GoBackButton from '@/components/ui/GoBackButton'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function EditProductsPage({ params }: { params: { id: string } }){
    const id = +params.id
    const product = await prisma.product.findUnique({where:{id}})
    if(!product){
        notFound()
    }
  return (
      <>
          <Heading>Editar Producto: <span className=' font-normal text-2xl'>{product.name}</span></Heading>
          <GoBackButton/>
          <EditProductForm>
              <ProductForm
                  product={product}
              />
          </EditProductForm>
      </>
  )
}
