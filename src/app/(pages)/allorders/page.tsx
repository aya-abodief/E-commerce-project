"use client"
import { allOrdersApi} from '@/actions/profile.action';
import OrderItem from '@/component/order/orderItem';

import { OrdersI } from '@/typescriptInterface/allorders';

import { useSession } from 'next-auth/react';

import React, { useEffect, useState } from 'react'

export default function OrdersPage() {


  const { data: session} = useSession()

  const [data, setData] = useState<OrdersI[] | []>([])

 const commonAddress = data[0]
  async function getAllOrders() {

    const data: OrdersI[] = await allOrdersApi()

    setData(data)
    console.log("all orders data", data);

  }





  useEffect(() => {
    getAllOrders()
 
  }, [])

  return (
    <div className='container mx-auto mt-4 '>
      <div className=" grid gap-5 ">
        <h2 className='font-semibold text-2xl'>Recent Order</h2>
        <div className='md:flex gap-4 space-y-4'>

          <div className='bg-white md:w-1/2 p-5 border rounded-xl space-y-0.5'>
            <h2 className='text-lg text-[#A21A4c] font-semibold mb-1'>Customer Information</h2>
            <p className='text-muted-foreground'>Name: {<><span className='text-black p-2'>{session?.user.name}</span></>} </p>
            <p className='text-muted-foreground'>Email:{<><span className='text-black p-2'>{session?.user.email}</span></>}</p>
            <p className='text-muted-foreground'>Phone:{<><span className='text-black p-2'>{commonAddress?.shippingAddress?.phone}</span></>}</p>
          </div>


          <div className='bg-white md:w-1/2 p-5   border rounded-xl space-y-0.5 md:mb-4'>
            <h2 className='text-lg font-semibold text-[#A21A4c] mb-1'>Shippind Address</h2>
            <p className='text-muted-foreground'>City:{<><span className='text-black px-2'>{commonAddress?.shippingAddress?.city}</span></>}</p>
            <p className='text-muted-foreground'>Details:{<><span className='text-black px-2'>{commonAddress?.shippingAddress?.details}</span></>}</p>
            <p className='text-muted-foreground'>Phone:{<><span className='text-black px-2'>{commonAddress?.shippingAddress?.phone}</span></>}</p>
          </div>


        </div>
        {
          [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()

          ).map((item) => <OrderItem key={item.id} orderItem={item} />)}
      </div>
    </div>
  )
}

