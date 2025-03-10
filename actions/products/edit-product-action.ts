"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"


export async function editProductById(formData: unknown, id : number){
    try {
        const result = ProductSchema.safeParse(formData)
        if(!result.success){
            return {
                errors: result.error.issues
            }
        }
        await prisma.product.update({
            where: {
                id
            },
            data: result.data
        })
        revalidatePath('/admin/products')
    } catch (error) {
            console.log(error)
    }
}