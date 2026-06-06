
"use client"
import { getLoggedWishList } from '@/actions/productHeartApis.action'
import WishListItem from '@/component/wishList/wishListItem';

import { WishListI } from '@/typescriptInterface/wishlist';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function WishList() {

  const [productsOfWishList, setProductsOfWishList] = useState<WishListI[] | []>([])

  async function getLoggedUserWishList() {
    try {
      const response = await getLoggedWishList()
      const { data: wishListProducts } = response as { data: WishListI[] }
      console.log("wishlista",wishListProducts);
      setProductsOfWishList(wishListProducts)

    }
    catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {

    getLoggedUserWishList()
  }, [])


  return (

    <>
    <div className='container mx-auto mt-10 '>
<div className='flex items-center gap-x-2 justify-center  text-center mb-2 '> <h2 className='text-[#A21A4c]  text-3xl font-semibold mb-5 '>Wishlist Items </h2> <Heart size={42} className='text-[#A21A4c]' /></div>
      {productsOfWishList.length == 0?( <div className='flex items-center justify-center h-screen text-2xl'><p> Cart Is Empty , GO <Link href='/products' className='text-blue-600 underline'>Shop Now 🛒 </Link> </p></div>):( <div className='flex flex-col gap-6'>
        {
          productsOfWishList.map((productWishList) => <WishListItem key={productWishList._id} productWishList={productWishList} getLoggedWishList={getLoggedUserWishList} />)
        }
      </div>)}
     
    </div>



    </>


  )
}
