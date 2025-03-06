"use server"

import OrderSidebar from "@/components/order/OrderSidebar"
import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

export async function createOrder(data: unknown){
    const result = OrderSchema.safeParse(data)
        if(!result.success){
            return{
                errors: result.error.issues
            }
        }
    try {
        
        const response = await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(order => ({
                        productId: order.id,
                        quantity: order.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function getPendingOrders(){
    try {
        const orders = await prisma.order.findMany({
            where: {
                status: false
            },
            include: {
                orderProducts: {
                    include: {
                        product: true
                    }
                }
            }
        })
        return orders
    } catch (error) {
        console.log(error)
    } 
}