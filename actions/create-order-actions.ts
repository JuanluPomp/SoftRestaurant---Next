"use server"

import { prisma } from "@/src/lib/prisma"
import { Order } from "@prisma/client"

export async function createOrder(order: Order[]){
    try {
        await prisma.order.createMany({
            data: order
        })
    } catch (error) {
        console.log(error)
    }
}