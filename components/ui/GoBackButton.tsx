"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

export default function GoBackButton() {
    const router = useRouter()
  return (
        <button
            onClick={() => router.back()}
            className=" bg-amber-400 font-bold py-2 px-3 hover:bg-amber-500 w-full lg:w-auto border border-gray-200
              rounded-md"
        >Regresar a productos</button>
  )
}
