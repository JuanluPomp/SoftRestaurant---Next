"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/types"

export async function completeOrder(formaData : FormData){
    const data = {
        orderId: formaData.get('order_id')
    }
    const result = OrderIdSchema.safeParse(data)
    
    if(result.success){console.log(result.data.orderId)
        try {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    
}

