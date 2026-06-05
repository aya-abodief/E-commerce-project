"use client"
import { Button } from '@/components/ui/button'
import { WishListI } from '@/typescriptInterface/wishlist'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import BtnCart from '../product/productBtn'
import { removeItemFrmWishListApis } from '@/actions/productHeartApis.action'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { wishListContext } from '@/provider/wishListProvider'
import Link from 'next/link'

export default function WishListItem({ productWishList, getLoggedWishList }: { productWishList: WishListI, getLoggedWishList: () => void }) {
    const [isLoading, setIsLoading] = useState(false)
    const { handleWishList, totalWishes } = useContext(wishListContext)


    // remove 

    async function remveItemFromWishList(id: string) {
        try {
            setIsLoading(true)
            const response = await removeItemFrmWishListApis(id)
            console.log(response);
            console.log(response.data);

            if (response.status == "success") {
                toast.success("Product removed successfully from your wishlist", { position: "top-center" })
            }
            await getLoggedWishList()
            await handleWishList()
            console.log(totalWishes);

        } catch (error: any) {
            toast.error("wrong occure", { position: "top-center" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
              

            <main className='flex items-center gap-10 border rounded-xl bg-white '>

             
                <div className='relative'>
                    <Image width={140} height={140} className='object-cover rounded-md border m-3  ' src={productWishList.imageCover} alt={productWishList.brand.name}></Image>
                    <Heart onClick={() => remveItemFromWishList(productWishList._id)} className='absolute top-3 right-3 size-7 cursor-pointer text-white fill-[#A21A4c] hover:text-[#A21A4c] hover:fill-white transition-all deuration-300 ease-in-out' />
                </div>


                <div className='p-6 space-y-3'>
                    <p className='text-muted-foreground'>{productWishList.description}</p>
                    <p className='text-[#A21A4c] text-lg'>{productWishList.price} EGP</p>
                    <p className='text-muted-foreground'>{productWishList.brand.name}</p>
                    <div className='flex gap-4'>

                        <BtnCart productId={productWishList._id} className='w-40 rounded-lg' /> 
                        
                        <Button size="lg" className='bg-[#A21A4c]' onClick={() => remveItemFromWishList(productWishList._id)}>
                            {isLoading ?
                                <Spinner /> :
                                <>
                                    <Trash2 />Remove
                                </>
                            }

                        </Button>
                    </div>
                </div>
            </main>


        </div>
    )
}
