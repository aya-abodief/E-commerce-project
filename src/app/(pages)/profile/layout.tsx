"use client"
import { ArrowRight, ListOrdered, LockKeyhole, MapPin, Pencil, UserRound } from 'lucide-react'
import { useSession } from 'next-auth/react'

import Link from 'next/link'
import React from 'react'
export default function Layout({
    children }: Readonly<{
        children: React.ReactNode;
    }>) {

    const { data: session } = useSession()

    return (
     
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className=" mt-4 col-span-1">
                    <div className=' space-y-10 bg-[#fff8fa] border-[#ebc5d3] border p-5 rounded-lg '>

                        <div className=' flex items-center gap-3'>
                            <div className='p-1 bg-[#f0c4d4] rounded-full flex items-center justify-center'>
                                <UserRound className='text-[#949192]' size={53} />
                            </div>
                            <div className='text-black'>
                                <p className='text-lg'>{session?.user.name}</p>
                                <p className='text-sm text-muted-foreground '>{session?.user.email}</p>
                            </div>

                        </div>
                        <ul className=' text-[#33141c]'>
                            <Link href={"/profile/editProfile"}><li className='hover:cursor-pointer hover:bg-[#cc3f72] hover:text-white  hover:rounded-md transition-all flex justify-between items-center text-md p-3'>
                                <span><Pencil className='inline pr-1.5 ' size={25} />Edit Profile</span> <span><ArrowRight size={18} /></span></li>
                            </Link>

                            <Link href={"/profile/changePassword"}>
                                <li className='hover:cursor-pointer hover:bg-[#cc3f72] hover:text-white   hover:rounded-md transition-all flex justify-between items-center text-md p-3'>
                                    <span><LockKeyhole className='inline pr-1.5 ' size={25} />Change Password</span> <span><ArrowRight size={18} /></span></li>
                            </Link>
                            <Link href={"/profile/address"}>
                                <li className='hover:cursor-pointer hover:bg-[#cc3f72] hover:text-white   hover:rounded-md transition-all flex justify-between items-center text-md p-3'>
                                    <span><MapPin className='inline pr-1.5 ' size={25} />Address</span> <span><ArrowRight size={18} /></span></li>

                            </Link>
                            <Link href="/allorders">
                                <li className='hover:cursor-pointer hover:bg-[#cc3f72] hover:text-white  hover:rounded-md transition-all flex justify-between items-center text-md p-3'>
                                    <span><ListOrdered className='inline pr-1.5 ' size={25} />My Orders</span> <span><ArrowRight size={18} /></span></li>


                            </Link>
                        </ul>

                    </div>

                </div>

                <div className='col-span-2 mt-4'>
                    {children}
                </div>
            </div>
       

    )
}
