import EditProductForm from '@/components/products/EditProductForm'
import ProductForm from '@/components/products/ProductForm'
import GoBackButton from '@/components/ui/GoBackButton'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

async function getProductById(id: number){
        const product = await prisma.product.findUnique({where:{id}})
        console.log(product)
        if(!product){
            notFound()
        }
        return product
}

type PageProps = {
    params: {id: string}
}
export default async function EditProductsPage({params} :
PageProps) {
    const param = await params
    const product = await getProductById(+param.id)
    console.log(product)
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
