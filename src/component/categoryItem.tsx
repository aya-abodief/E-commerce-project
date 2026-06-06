import React from 'react'

import {
  Card,

  CardFooter,
  CardHeader,

} from "@/components/ui/card"

import Image from 'next/image'
import { ICategory } from '@/typescriptInterface/category'
import Link from 'next/link'

export default function CategoryItem({ category }: { category: ICategory }) {
  return (

    <Link href={`categories/${category._id}`} >
      <Card className=" group w-full  rounded-2xl border shadow-lg  hover:shadow-lg hover:-translate-y-4 transition-all ease-in-out  duration-300 p-4">
        <CardHeader>
          <Image width={500} height={500} src={category.image} alt={category.slug} className="object-cover h-35 sm:h-50 group-hover:rotate-1  md:h-40 xl:h-55 rounded-full  transition-all ease-in-out  duration-300  " />
        </CardHeader>


        <CardFooter>
          <h2 className="font-semibold text-lg xl:text-xl  text-center ">{category.name}</h2>
        </CardFooter>
      </Card>
    </Link>
    
   
  )
}

