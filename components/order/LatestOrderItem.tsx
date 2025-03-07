
import { OrderWithProducts } from '@/src/types'
import React from 'react'

type LatestOrderItemProps = {
    order: OrderWithProducts
}

export default function LatestOrderItem({order} : LatestOrderItemProps) {
  return (
    <div className=' bg-white shadow p-5 space-y-5 rounded-lg'>
        <p className=' font-bold text-2xl'>
                Cliente: <span className=' font-normal'>{order.name}</span>
        </p>
        <ul
            role='list'
            className=' divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500'
        >
                {order.orderProducts.map(product => (
                    <li
                        key={product.id}
                        className=' felx py-6 text-lg'
                    >
                        <p>
                            <span className=' text-black font-bold'>({product.quantity}){' '}</span>
                            {product.product.name}
                        </p>
                    </li>
                ))}
        </ul>
    </div>
  )
}
