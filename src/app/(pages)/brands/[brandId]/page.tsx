
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
import { IBrand, IBrandDetails } from '@/typescriptInterface/brand'
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'
import BtnCart from '@/component/product/productBtn'
import Link from 'next/link'
import HeartBtn from '@/component/product/heartBtn'


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export default async function brandDetails({ params }: { params: Promise<Params> }) {

  const { brandId } = await params
  console.log(brandId);

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)

  const data = await response.json()
  const { data: brandDetails } = data as { data: IBrandDetails[] }
  console.log("data of brand detailes", brandDetails);


  return (
    <div className='container mx-auto mt-10'>
   <div className="mb-6 " >
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/brands">Brands</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
      {brandDetails.length == 0 ? 
      (<><div className='flex items-center justify-center'><h1 className='text-4xl text-center m-6 bg-amber-200 font-sans '>This Cart Is Empty </h1></div></>) 
      :
        (<>

          <main className='grid grid-cols-2 md:grid-cols-4 gap-6'>  
          {brandDetails.map((brandDetail) =>
            <Card className="mx-auto w-full border rounded-lg pb-6 px-3" key={brandDetail._id}>
              <Link href={`/products/${brandDetail._id}`}>
                <CardHeader className='overflow-hidden'>
                  <Image width={200} height={200} src={brandDetail.imageCover} alt={brandDetail.slug} className='object-cover h-75 hover:scale-[1.02] transition-all ease-in-out  duration-300' />
                  <CardDescription>{brandDetail.brand.name}</CardDescription>
                  <CardTitle>{brandDetail.title.trim().split(" ").splice(0, 3).join("")}</CardTitle>
                  <CardDescription>{brandDetail.category.name}</CardDescription>
                  <h3 className='font-bold text-lg'>EGP {brandDetail.price}</h3>
                </CardHeader>
                <CardContent className='flex items-center'>
                  {
                    [0, 1, 2, 3, 4].map((star, index) => {
                      const fillStar = index < Math.floor(brandDetail.ratingsAverage)
                      return <React.Fragment key={index}>
                        <Star className={`${fillStar ? "text-yellow-400 fill-yellow-400" : " text-gray-300 "} `} />
                      </React.Fragment>
                    })

                  }


                  <h4 className='text-gray-400'>({brandDetail.ratingsAverage})</h4>
                </CardContent>
              </Link>
              <CardFooter className='flex items-center gap-2'>
                <BtnCart productId={brandDetail._id} className='grow rounded-xl' />  <HeartBtn prodId={brandDetail._id} />
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




