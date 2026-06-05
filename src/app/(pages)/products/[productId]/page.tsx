


import * as React from "react"



import {
    Carousel,
    CarouselContent,
    CarouselItem,

} from "@/components/ui/carousel"



import { Iproduct } from '@/typescriptInterface/product'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import {  Star } from 'lucide-react'

import Link from 'next/link'

import HeartBtn from "@/component/product/heartBtn"




import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { RelatedProductI } from "@/typescriptInterface/relatedProduct"
import BtnCart from "@/component/product/productBtn"

export default async function ProductDetailes({ params,
}: {
    params: Promise<{ productId: string }>
}) {


    const { productId } = await params
    console.log(productId)
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    const data = await response.json()
    const { data: product } = data as { data: Iproduct }
    console.log(product)


    const relatedResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${product.category._id}`)
    const relatedData = await relatedResponse.json()
    const { data: reltedProduct } = relatedData as { data: RelatedProductI[] }
    console.log("related prod", reltedProduct);





    return (


        <main className="container mx-auto">
            <div className="mt-5" >
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="container mx-auto border mt-10 shadow rounded-xl ">

                <div className=" grid grid-cols-5 gap-8 p-8">


                    <div className="col-span-2">

                        <Carousel>
                            <CarouselContent>
                                {
                                    product?.images?.map((img, index) =>
                                        <CarouselItem key={index}>
                                            <Image width={500} height={500} alt=" product-img" src={img} className='object-cover h-80' />

                                        </CarouselItem>
                                    )

                                }


                            </CarouselContent>

                        </Carousel>
                    </div>


                    <Card className='col-span-3'>

                        <CardHeader>
                            <CardDescription>{product?.brand?.name}</CardDescription>
                            <CardTitle>{product?.title?.trim().split(" ").splice(0, 3).join("")}</CardTitle>
                            <CardDescription>{product?.category.name}</CardDescription>
                            <CardDescription className="text-black" >{product?.description}</CardDescription>
                            <h3 className='font-bold text-lg'>EGP {product?.price}</h3>
                        </CardHeader>
                        <CardContent className='flex items-center gap-1'>
                            {
                                [0, 1, 2, 3, 4].map((star, index) => {
                                    const fillStar = index < Math.floor(product?.ratingsAverage)
                                    return <React.Fragment key={index}>
                                        <Star className={`${fillStar ? "text-yellow-400 fill-yellow-400" : " text-gray-300 "} `} />
                                    </React.Fragment>
                                })

                            }

                            <h4 className='text-gray-400'>({product?.ratingsAverage})</h4>
                        </CardContent>



                        <CardFooter className='flex items-center gap-2'>
                          
                             <BtnCart productId={product._id} className='grow rounded-xl' />
                            <HeartBtn prodId={product._id} />
                        </CardFooter>

                    </Card>
                </div>
            </div>

            {/* related products */}


            <div className="space-y-4 mt-10">
         <p className="text-2xl  text-center py-5 text-[#A21A4c]">Relted Products</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
     {reltedProduct.map((itemrelted) => <React.Fragment key={itemrelted._id}>
                    <div >
                        <Card className='border rounded-xl pb-6 '>

                            <Link href={`/products/${itemrelted._id}`}>


                                <CardHeader className='overflow-hidden'>
                                    <Image width={1000} height={1000} alt=" product-img" src={itemrelted.imageCover} className='object-cover h-80 hover:scale-[1.02] transition-all ease-in-out  duration-300' />
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

                                <BtnCart productId={product._id} className="w-full rounde-xl" />

                                <HeartBtn prodId={product._id} />
                            </CardFooter>
                        </Card>
                    </div>
                </React.Fragment>

                )}

            </div>
                   
            </div>
        </main>

    )
}
