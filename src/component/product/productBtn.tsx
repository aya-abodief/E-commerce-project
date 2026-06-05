"use client"
import { addToCartApi } from '@/actions/productCartApis.action'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cartContext } from '@/provider/cartContext'
import { Heart, ShoppingCart } from 'lucide-react'
import { redirect } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function BtnCart({ productId ,className }: { productId: string , className:string }) {

    const [isLoading, setIsLoading] = useState(false)
    const { handleTotalCarts } = useContext(cartContext)
    async function addProductToCart(prodId: string) {
        try {
            setIsLoading(true)

            const response = await addToCartApi(prodId)
            console.log("response products", response)
            if (response.status == "success") {
                toast.success("Product Added Successfuly", { position: "top-center" })
            }
            handleTotalCarts()
        }
        catch (error:any) {
            console.log(error);
            toast.error(error.message, { position: "top-center" })
            redirect("/login")

        } finally {
            setIsLoading(false)

        }
    }
    return (
        <Button disabled={isLoading} className={className} onClick={() => addProductToCart(productId)} >
            {isLoading ? <Spinner></Spinner> : <>
                <ShoppingCart />
                Add To Cart
               
            </>}
        </Button>
    )
}
