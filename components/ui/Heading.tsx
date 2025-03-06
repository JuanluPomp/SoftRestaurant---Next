import React from 'react'

export default function Heading({children}:{ children: React.ReactNode}) {
  return (
    <div>
        <h1 className=" text-3xl font-bold  mb-10">{children}</h1>
    </div>
  )
}
