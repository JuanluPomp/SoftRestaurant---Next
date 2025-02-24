import { products } from "./data/products"
import { categories } from "./data/categories"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function main(){
    try {
        await prisma.category.createMany({
            data: categories
        })
        await prisma.product.createMany({
            data: products
        })

    } catch (error) {
        console.log(error)
    }
}

main()
    .then(async () =>{
        await prisma.$disconnect()
    })
    .catch(async (error) =>{
        console.log(error)
        await prisma.$disconnect()
        process.exit(1)
    })