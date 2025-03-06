"use server"
import { getProducts } from "@/actions/products/get-products";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsTable from "@/components/products/productsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function countProducts(){
    const totalProducts = await prisma.product.count()
    return totalProducts
}

export default async  function ProductsPage({searchParams}: {searchParams: {page: string}}) {
  const page = +searchParams.page || 1
  const totalItems = 10

  if(page < 0) redirect('admin/products')

  const productsData = getProducts(page)
  const totalProductsData = countProducts()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])

  const totalPages = Math.ceil(totalProducts/totalItems)
  const itemsPerPage = products!.length

  if(page > totalPages) redirect('/admin/products')
  
  return (
    <>
        <Heading>Administrar productos</Heading>

        <div className=" flex flex-col gap-5 lg:flex-row lg:justify-between">
            <Link
                href={'/admin/products/new'}
                className=" bg-amber-400 font-bold py-2 px-3 hover:bg-amber-500 w-full lg:w-auto border border-gray-200
                  rounded-md"
            >Crear Producto</Link>

            <ProductSearchForm/>
        </div>
        


        <ProductsTable
            products={products!}
        />
        <ProductsPagination
            page={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
        />
    </>
    
  )
}
