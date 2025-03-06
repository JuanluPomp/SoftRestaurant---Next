import { prisma } from "@/src/lib/prisma"


export async function getProductBySearch(search: string){
    try {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            include: {
                category: true
            }
        })
        return products
    } catch (error) {
        console.log(error)
    }
}