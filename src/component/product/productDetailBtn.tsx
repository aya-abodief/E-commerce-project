
"use client"
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cartContext } from '@/provider/cartContext'
import { ShoppingCart } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function ProductDetailBtn() {
    const { handleTotalCarts, totalOfCarts } = useContext(cartContext)
    const [isLoading, setIsLoading] = useState(false)

    function handleTotal() {
        try {

            setIsLoading(true)
            toast.success("Go To Product To add", { position: "top-center" })
            console.log(totalOfCarts);

            handleTotalCarts()
        }
        catch (error) {
            console.log(error);
            toast.error("wrong occure", { position: "top-center" })

        } finally {
            setIsLoading(false)
        }
    }
    return (

        <div>
            <Button className='grow' onClick={handleTotal} >

                {isLoading ? <Spinner /> :
                    <>
                        <ShoppingCart />
                        <span>Add T o Cart</span>
                    </>
                }
            </Button>
        </div>
    )
}
