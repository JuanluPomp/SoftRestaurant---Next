"use server"

import { prisma } from "@/src/lib/prisma"


export async function getProducts(page: number){
    const itemsPerPage = 10 
    let skip
    if(page === 1){
        skip = (page-1) * itemsPerPage
    }else{
        skip = (page-1) * itemsPerPage
    }
    try {
        const products = await prisma.product.findMany({
            take: itemsPerPage,
            skip,
            include:{
                category: true
            }
        })
        
            return products
        
    } catch (error) {
        console.log(error)
    }
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>