"use client"
import useSWR from 'swr'
import Logo from '@/components/ui/logo'
import React from 'react'
import { OrderWithProducts } from '@/src/types'
import LatestOrderItem from '@/components/order/LatestOrderItem'

export default function ReadyOrdersPage() {
    const url = '/readyorders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const {data, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    })
    if(isLoading) return <p>cargando ordenes listas...</p>
    console.log(data)
  if(data) return (
    <>
        <h1 className=' text-center text-3xl font-bold mt-20'>Ordenes listas</h1>
        <Logo/>
        {data.length ? (
            <div className=' grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10'>
                {data.map(order => (
                    <LatestOrderItem
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
        ): <p></p>}
    </>
  )
}
