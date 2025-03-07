"use client"
import { CldUploadWidget } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'
import React, { useState } from 'react'
import Image from 'next/image'
import { getCorrectPathname } from '@/src/utils'

export default function ImageUpload({image}: {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState('')

  return (
    <CldUploadWidget
        onSuccess={(result, {widget}) => {
            if(result.event === 'success'){
                widget.close()
                // @ts-expect-error: fix de tipos para secure_url
                setImageUrl(result.info.secure_url)

            }
        }}
        uploadPreset='ml_default'
        options={
            {
                maxFiles: 1,
            }
        }
    >
        {({open})=> (
            <>
                <div className=' space-y-2'>
                    <label
                        className=' text-slate-800'
                    >Imagen de producto</label>
                    <div className=' relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col      justify-center items-center gap-4 text-neutral-600 bg-slate-100'
                    onClick={()=> open()}>
                        <TbPhotoPlus
                            size={50}
                        ></TbPhotoPlus>
                        <p className=' text-lg font-semibold'>Agregar Imagen</p>

                        {imageUrl && (
                            <div className=' absolute inset-0 w-full h-full'>
                                <Image
                                    fill
                                    style={{objectFit: 'contain'}}
                                    src={imageUrl}
                                    alt='Imagen de producto'
                                ></Image>
                            </div>
                        )}
                    </div>
                    
                </div>
                {!imageUrl && image && (
                    <div className=' space-y-2'>
                        <label>Imagen actual:</label>
                        <div className=' relative w-64 h-64'>
                            <Image
                                fill
                                src={getCorrectPathname(image!)}
                                alt='Imagen producto'
                            />
                        </div>
                    </div>
                )}
                <input 
                    type="hidden"
                    name='image'
                    defaultValue={imageUrl ? imageUrl : image}
                />
            </>
        )}
    </CldUploadWidget>
  )
}
