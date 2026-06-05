
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'
import BtnCart from '@/component/product/productBtn'
import Link from 'next/link'
import { ICategoryDetail } from '@/typescriptInterface/category'
import HeartBtn from '@/component/product/heartBtn'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function CategoryDetails({ params }: { params: Promise<Params> }) {

  const { categoryId } = await params
  console.log(categoryId);

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)

  const data = await response.json()
  const { data: categoryDetails } = data as { data: ICategoryDetail[] }
  console.log("data of brand detailes", categoryDetails);


  return (
    <div className='container mx-auto mt-10  '>
 <div className="mb-6 " >
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
      {categoryDetails.length == 0 ? 
      (<><div className='flex items-center justify-center h-screen'><h1 className='text-3xl font-semibold text-center text-[#A21A4c] m-6  font-sans '>This Cart Is Empty🛒 </h1></div></>) 
      :
        (<>

          <main className='grid grid-cols-2 md:grid-cols-4 gap-6 '>  
          {categoryDetails.map((categoryDetail) =>
            <Card className="mx-auto w-full border rounded-lg pb-6 px-3 " key={categoryDetail._id}>
              <Link href={`/products/${categoryDetail._id}`}>
                <CardHeader className='overflow-hidden'>
                  <Image width={200} height={200} src={categoryDetail.imageCover} alt={categoryDetail.slug} className='object-cover h-75 hover:scale-[1.02] transition-all ease-in-out  duration-300' />
                  <CardDescription>{categoryDetail.brand.name}</CardDescription>
                  <CardTitle>{categoryDetail.title.trim().split(" ").splice(0, 3).join("")}</CardTitle>
                  <CardDescription>{categoryDetail.category.name}</CardDescription>
                  <h3 className='font-bold text-lg'>EGP {categoryDetail.price}</h3>
                </CardHeader>
                <CardContent className='flex items-center'>
                  {
                    [0, 1, 2, 3, 4].map((star, index) => {
                      const fillStar = index < Math.floor(categoryDetail.ratingsAverage)
                      return <React.Fragment key={index}>
                        <Star className={`${fillStar ? "text-yellow-400 fill-yellow-400" : " text-gray-300 "} `} />
                      </React.Fragment>
                    })

                  }


                  <h4 className='text-gray-400'>({categoryDetail.ratingsAverage})</h4>
                </CardContent>
              </Link>
              <CardFooter className='flex items-center gap-2'>
                <BtnCart productId={categoryDetail._id} className='grow rounded-xl' />  <HeartBtn prodId={categoryDetail._id} />
              </CardFooter>
            </Card>
          )
          }
        </main>
        </>
        )
}
  
    </div >
  )
}




