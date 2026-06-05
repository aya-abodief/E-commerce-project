
import { Iproduct } from '@/typescriptInterface/product'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Star } from 'lucide-react'
import Link from 'next/link'
import BtnCart from '@/component/product/productBtn'
import HeartBtn from '@/component/product/heartBtn'
export default async function Products() {

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/products")
  const data = await response.json()
  const { data: products } = data as { data: Iproduct[] }
  console.log("all products", products)




  return (
    <>
      <div className="container mx-auto">


        <main className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4  p-5 gap-7">
          {products.map((product) => {
            return <React.Fragment key={product._id}>
              <div >
                <Card className='border rounded-xl pb-6'>

                  <Link href={`products/${product._id}`}>


                    <CardHeader className='overflow-hidden'>
                      <Image width={1000} height={1000} alt=" product-img" src={product.imageCover} className='object-cover h-80 hover:scale-[1.02] transition-all ease-in-out  duration-300' />
                      <CardDescription>{product.brand.name}</CardDescription>
                      <CardTitle>{product.title.trim().split(" ").splice(0, 3).join("")}</CardTitle>
                      <CardDescription>{product.category.name}</CardDescription>
                      <h3 className='font-bold text-lg'>EGP {product.price}</h3>
                    </CardHeader>
                    <CardContent className='flex items-center gap-1'>
                      {
                        [0, 1, 2, 3, 4].map((star, index) => {
                          const fillStar = index < Math.floor(product.ratingsAverage)
                          return <React.Fragment key={index}>
                            <Star className={`${fillStar ? "text-yellow-400 fill-yellow-400" : " text-gray-300 "} `} />
                          </React.Fragment>
                        })

                      }


                      <h4 className='text-gray-400'>({product.ratingsAverage})</h4>
                    </CardContent>
                  </Link>


                  <CardFooter className='flex items-center gap-2'>

                    <BtnCart productId={product._id} className='grow rounded-xl' />
                    
                   <HeartBtn prodId={product._id} />
                  </CardFooter>
                </Card>
              </div>
            </React.Fragment>
          })}



        </main>
      </div>
    </>
  )
}
