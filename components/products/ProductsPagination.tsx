import Link from 'next/link'
import React from 'react'

type ProductsPaginationProps = {
    page: number
    totalPages: number
    itemsPerPage: number
}

export default function ProductsPagination({page, totalPages, itemsPerPage}: ProductsPaginationProps) {
  const pages = Array.from({length: totalPages}, (_, i) => i + 1)

  return (
    <nav className=' container px-5 flex justify-between items-center py-10'>
          <div className=' flex text-xl'>
              <p className=' mx-5 font-bold'>Pagina {' '}<span className=' font-normal'>{page +'/'}{totalPages} </span> </p>
              <p className=' mx-5 font-bold'>{itemsPerPage}<span className=' font-normal'>{' '} productos </span> </p>
          </div>
          <div className='flex justify-center items-center space-x-1 font-normal'>
              <Link
                href={`/admin/products?page=${(page-1)}`}
                className={`${page<=1 ? 'pointer-events-none  cursor-not-allowed': ''}bg-white px-4 py-2 text-3xl text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9 rounded-xl`}
              >&laquo;</Link>
              {pages.map(currentPage => (
                  <Link
                      key={currentPage}
                      href={`/admin/products?page=${currentPage}`}
                      className={`${page === currentPage ? 'bg-amber-400 font-black' : ''}bg-white px-4 py-2 text-xl text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9 rounded-md`}
                  >{currentPage}</Link>
              ))}
              <Link
                  href={`/admin/products?page=${(page+1)}`}
                  className={`${page>=totalPages ? 'pointer-events-none  cursor-not-allowed': ''}bg-white px-4 py-2 text-3xl text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9 rounded-xl`}
              >&raquo;</Link>
          </div>
            
    </nav>
  )
}
