"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Category } from '@prisma/client'
import { useParams } from 'next/navigation'


type CategoryItemProps = {
    category: Category
}

export default function CategoryItem({category}: CategoryItemProps) {
    const params = useParams()
  return (
    <div 
        className={`${category.slug === params.category ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b `}
    >
        <div className=' w-16 h-16 relative'>
            <Image
                fill
                src={`/icon_${category.slug}.svg`} alt=''
            />
        </div>
        <Link
            href={`/order/${category.slug}`} 
            className=' text-xl font-bold cursor-pointer hover:text-2xl'>
            {category.name}
        </Link>
        
    </div>
  )
}
