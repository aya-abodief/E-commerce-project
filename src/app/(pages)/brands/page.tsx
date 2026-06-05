import { BrandCart } from '@/components/ui/brandItem'
import { getUserToken } from '@/lib/authToken'
import { IBrand } from '@/typescriptInterface/brand'
import React from 'react'

export default async function Brand() {

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
  const data = await response.json()
  const { data: brands } = data as { data: IBrand[] }
  console.log("response of brands", brands);





  return (
    <div className='container mx-auto overflow-hidden'>
  <h1 className='font-bold text-4xl mb-10 mt-5 text-center ' >Brands</h1>

      <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  gap-y-10'>
      
        {brands.map((brand) => <BrandCart brand={brand} key={brand._id} />)}
      </main>
    </div>
  )
}

