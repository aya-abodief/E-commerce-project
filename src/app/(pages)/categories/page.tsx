import { ICategory } from '@/typescriptInterface/category'
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IBrand } from '@/typescriptInterface/brand'
import Image from 'next/image'
import CategoryItem from '@/component/categoryItem'

export default async function Categories() {

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
  const data = await response.json()
  const { data: categories } = data as { data: ICategory[] }
  console.log("categories", categories);

  return (
    <div className='container mx-auto mt-5 '>
     <h2 className='font-bold text-4xl mb-10 mt-5 text-center  ' >Categories</h2>
      <main className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 '>
        {
          categories.map((category) => <CategoryItem key={category._id} category={category}  />)
        }
      </main>


    </div>
  )
}
