"use client"

import { getLoggedWishList } from '@/actions/productHeartApis.action'
import { WishListI } from '@/typescriptInterface/wishlist'
import React, { createContext, useEffect, useState } from 'react'

interface wishContextI
{
    totalWishes:number,
    handleWishList:()=>void
}

export const wishListContext = createContext<wishContextI>(
    {
        totalWishes:0,
         handleWishList:()=>{}
    }
)

export default function WishListProvider({children}:{children:React.ReactNode}) {

    const [totalWishes,setTotalWishes]=useState(0)

async function handleWishList()
{
   try
   {
     const response = await getLoggedWishList()
     const {data} = response as {data:WishListI[]}
     console.log("reponse of wish from context",data);
     const total = data.length
     
     setTotalWishes(total)
     total==0&&<><p>WishList Is Empty</p></>
     
   }catch(error)
   {
    console.log(error);
    
   }
   finally{

   }
}
useEffect(()=>{
    handleWishList()
},[])

  return (
    <div>
      <wishListContext.Provider value={{totalWishes ,handleWishList}} >

        {children}
      </wishListContext.Provider>
    </div>
  )
}
