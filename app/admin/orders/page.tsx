import { getPendingOrders } from '@/actions/order/create-order-actions'
import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import React from 'react'



export default async  function OrdersPage() {
  const orders = await getPendingOrders()
  console.log(orders)
  return (
    <div>
      <Heading>Administra tus ordenes</Heading>
      {orders?.length ?(
          <div className=' grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
              {orders.map(order => (
                  <OrderCard
                      key={order.id}
                      order={order}
                  />
              ))}
          </div>
      ):(
          <p className=' text-center'>Todavia no hay ordenes</p>
      )

      }
    </div>
  )
}
