
"use client"
import { OrdersI } from '@/typescriptInterface/allorders'
import Image from 'next/image'
import React, { useState } from 'react'
import { Outfit, Poppins } from "next/font/google";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from '@/components/ui/badge';

const outfit = Outfit({
  subsets: ["latin"]

})


export default function OrderItem({ orderItem }: { orderItem: OrdersI }) {

  const date = new Date(orderItem.createdAt)

  const correctDate = date.toLocaleDateString("en-gb", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const [isOpen, setIsOpen] = useState(false)
  return (


    <div className='container mx-auto border rounded-3xl px-10 py-5 hover:bg-gray-50 bg-white'>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col gap-3"
      >
        <div className='flex  justify-between'>
          <p className='text-md font-semibold'>Order ID : {orderItem.id}</p>

          <div className='space-y-1'>
            <p className={`${outfit.className}  text-md text-[#A21A4c]`} >{orderItem.totalOrderPrice} EGP</p>

          </div>
        </div>

        <div className="flex justify-between ">

          <CollapsibleTrigger asChild>
            <div className="flex gap-2 text-gray-500 ">
              <p>{correctDate}</p>
              <span className='cursor-pointer text-blue-600 hover:text-blue-800 hover:underline'> {orderItem.cartItems.length} {orderItem.cartItems.length > 1 ? "Items" : "Item"}  </span>
            </div>

          </CollapsibleTrigger>
          {orderItem.isPaid ? <Badge className='bg-yellow-500'>Pending</Badge> : <Badge className='bg-green-700'>Delivered</Badge>}

        </div>

        <CollapsibleContent className="flex flex-col gap-4">
          <div className='space-y-1'>
            {
              orderItem.cartItems.map((cartItem) => <React.Fragment key={cartItem._id}>

                <Image width={100} height={100} src={cartItem.product.imageCover} alt={cartItem.product.title}></Image>
                <p className='text-md font-medium  '>{cartItem.product.title} </p>
                <p className='text-gray-400 text-sm'>
                  {cartItem.product.brand.name}
                  {cartItem.product.category.name}

                </p>
                <p className='text-muted-foreground flex gap-1'>{cartItem.count} piece  <span>({cartItem.price}EGP)</span></p>


              </React.Fragment>
              )}
          </div>
        </CollapsibleContent>
      </Collapsible>



    </div>

  )
}



