"use client"

import useSWR from 'swr'
import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import React from 'react'
import { OrderWithProducts } from '@/src/types'
import { toast } from 'react-toastify'


export default function OrdersPage() {

  const url = '/admin/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const {data, error, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
      refreshInterval: 60000,
      revalidateOnFocus: false
  })

  if(isLoading) return <p>cargando ordenes...</p>
  if(error) return toast.error(error)
  if(data) return (
    <div>
      <Heading>Administra tus ordenes</Heading>
      {data.length ?(
          <div className=' grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
              {data.map(order => (
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
