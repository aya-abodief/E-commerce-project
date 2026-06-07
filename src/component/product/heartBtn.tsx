
"use client"

import { addToHeartApi } from '@/actions/productHeartApis.action';
import { wishListContext } from '@/provider/wishListProvider';
import { Heart } from 'lucide-react'
import { redirect } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

export default function HeartBtn({ prodId }: { prodId: string }) {


const { handleWishList} = useContext(wishListContext)
  async function addToHeart(prodId: string) {
    try {
     
      const response = await addToHeartApi(prodId)
      console.log(response);
      if (response.status == "success") {
        toast.success(response.message, { position: "top-center" })
      }
      await  handleWishList()

    } catch (error) {
      console.log(error);
      toast.error("You must logged in to do this action", { position: "top-center" })
      redirect("/login")

    } finally {
     
    }
  }


  return (
    <div>
      <Heart className='size-7 cursor-pointer text-[#A21A4c]    hover:text-[#A21A4c] hover:fill-[#A21A4c]  transition-all duration-300 ease-in-out' onClick={() => addToHeart(prodId)} />
    </div>
  )
}
