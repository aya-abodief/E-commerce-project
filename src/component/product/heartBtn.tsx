
"use client"

import { addToHeartApi } from '@/actions/productHeartApis.action';
import { wishListContext } from '@/provider/wishListProvider';
import { Heart } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

export default function HeartBtn({ prodId }: { prodId: string }) {

  const [isLiked, setIsLiked] = useState(false)
const { handleWishList} = useContext(wishListContext)
  async function addToHeart(prodId: string) {
    try {
     
      const response = await addToHeartApi(prodId)
      console.log(response);
      if (response.status == "success") {
        toast.success(response.message, { position: "top-center" })
      }
      await  handleWishList()

    } catch (error: any) {
      console.log(error);
      toast.error(error.message, { position: "top-center" })

    } finally {
     
    }
  }


  return (
    <div>
      <Heart className='size-7 cursor-pointer text-[#A21A4c]    hover:text-[#A21A4c] hover:fill-[#A21A4c]  transition-all duration-300 ease-in-out' onClick={() => addToHeart(prodId)} />
    </div>
  )
}
