"use client"

import { useStore } from '@/src/store'
import React, { useMemo } from 'react'
import ProductDetails from './ProductDetails'
import { formatCurrency } from '@/src/utils'
import { OrderSchema } from '@/src/schema'
import { toast } from 'react-toastify'
import { createOrder } from '@/actions/order/create-order-actions'

export default function OrderSummary() {
  const order = useStore((state) => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + item.subTotal, 0), [order])

  const clearOrder = useStore(state => state.clearOrder)

  const handleCreateOrder = async (formData: FormData)=> {
      const data = {
        name: formData.get('name'),
        total,
        order
      }
      const result = OrderSchema.safeParse(data)
      console.log(result)
      if(!result.success){
          result.error.issues.forEach(issue => {
              toast.error(issue.message)
          })
     
          return
      }
      const response = await createOrder(data)
      if(response?.errors){
        response.errors.forEach(issue => {
            toast.error(issue.message)
        });
      }

      toast.success('orden registrada correctamente')

      clearOrder()
  }

  return (
    <aside className=' lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-92 p-5'>
        <h1 className=' text-4xl font-bold text-center'>Mi pedido</h1>
        {order.length ? (
          <div className=' mt-10'>
              {order.map(item => (
                <ProductDetails
                  key={item.id}
                  item={item}
                />
              ))}
          </div>
        ): 
          <p className=' mt-10'>No hay articulos</p>
        }
        <p className=' text-2xl text-center mt-5'>
          Total a pagar: {' '}
          <span className=' font-bold'>{formatCurrency(total)}</span>
        </p>

        <form
            action={handleCreateOrder} 
            className=' w-full mt-10 space-y-5' >

            <input 
              type="text"
              placeholder='Tu nombre'
              className=' bg-white p-2 border border-gray-100 w-full'
              name='name'
            />
            <input 
                type="submit"
                className=' py-2 uppercase rounded text-white font-bold bg-black w-full text-center cursor-pointer'
                value={'Comfirmar pedido'}
            />
        </form>
    </aside>
  )
}
