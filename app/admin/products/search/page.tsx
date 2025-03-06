import { getProductBySearch } from '@/actions/products/get-product-search'
import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductsTable from '@/components/products/productsTable'
import Heading from '@/components/ui/Heading'
import React from 'react'

export default async function ProductSearchPage({searchParams}: {searchParams: {search: string}}) {
    const products = await getProductBySearch(searchParams.search)
    console.log(products)
  return (
    <>
        <Heading>Resultado de la busqueda {searchParams.search}</Heading>
        <div className=" flex  flex-col gap-5 lg:flex-row lg:justify-end">
            <ProductSearchForm/>
        </div>
        {products?.length ?
            <ProductsTable
                products={products}
            />
            : <p className=' text-xl text-center'>No hay resultados para la busqueda</p>
        }
        
    </>
  )
}
