"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { House, Pencil, UserRound } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { addressI, OrdersI } from '@/typescriptInterface/allorders'
import { allOrdersApi, getAddressApis } from '@/actions/profile.action'

export default function ProfilePage() {

    const { data: session, status } = useSession()

    const [data, setData] = useState<OrdersI[] | []>([])
    const [address, setAddress] = useState<addressI[] | []>([])

    async function getAllOrders() {

        const data: OrdersI[] = await allOrdersApi()

        setData(data)
        console.log("all orders data", data);

    }
  

    async function handleAddress() {
        const response = await getAddressApis()
        console.log("one address from orders", response.data);
        setAddress(response.data)

    }
    useEffect(() => {
        getAllOrders()
        handleAddress()
    }, [])


    return (
        <main className='space-y-4'>
            <div className="mx-auto w-full rounded-2xl border p-3 bg-white">
                <h2 className='text-center mt-1 text-xl font-semibold '>Personal Information</h2>

                <div className='p-2 rounded-full text-center flex justify-center items-center'>
                    <UserRound className='text-[#949192] rounded-full  bg-red-200' size={65} />
                </div>


                <div className='text-center text-gray-500 text-md'>
                    <p>{session?.user.name}</p>
                    <p> {session?.user.email}</p>
                    
                </div>



                <div className='flex justify-end'>
                    <Link href={"/profile/editProfile"} className='flex items-center gap-2 bg-gray-100 p-2 rounded-3xl  hover:bg-amber-500'>Edit Profile <Pencil size={18} /></Link>
                </div>



            </div>


            <div className="mx-auto w-full rounded-2xl border p-3 bg-white">

                <h2 className='text-center mt-1 text-xl font-semibold '>Account Summary</h2>

                <div>
                    <p ><span className='text-muted-foreground'>Total Orders :</span> {data.length} </p>
                    <p ><span className='text-muted-foreground'>Deliverd :</span>  {data.filter((item) => !item.isPaid).length}</p>
                    <p ><span className='text-muted-foreground'>Pending :</span> {data.filter((item) => item.isPaid).length} </p>

                </div>
                <div className='flex'>
                    <Link href={"/allorders"} className='my-1 text-blue-500 underline'>My Orders </Link>
                </div>
            </div>



            <div className='mx-auto w-full rounded-2xl border p-3 bg-white space-y-6'>
                <h2 className='text-center mt-1 text-xl font-semibold '>Your Address</h2>
                {
                    address.length > 0 && address.map((addres) => <div key={addres._id} >
                        <div >
                            <div className="flex items-center gap-1 mb-1"><p className="bg-green-600 p-3 rounded-full inline-block text-white"><House size={15} /> </p> <span className="text-[#A21A4c] px-1">Your address</span></div>
                            <p >{session?.user.name}</p>
                            <p className="text-muted-foreground">{addres.name} , {addres.details} ,{addres.city}  </p>

                            <p className="text-muted-foreground">{addres.phone}</p>


                            <div className="flex justify-end text-[#A21A4c]">
                                {/* <button onClick={() => deleteAddress(addres._id)}>
                  {isLoading ? <Spinner /> : <div className="flex gap-0.5 items-center"> <Trash2 /><span>Delete</span></div>}
                </button> */}
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </main>

    )
}

