
"use client"

import { clearProductCart, getLoggedUserCart } from '@/actions/productCartApis.action'
import CartItem from '@/component/cart/CartItem';
import { CheckOut } from '@/component/cart/checkOut';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cartContext } from '@/provider/cartContext';
import { CartDataI, CartI, CartProductI } from '@/typescriptInterface/cart';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

export default function Cart() {
  const [products, setProducts] = useState<CartProductI[] | []>([])

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCartItSelf, setIsLoadingCartItSelf] = useState(true)

  const { handleTotalCarts, totalOfCarts } = useContext(cartContext)

  const [cart, setCart] = useState<CartI | null>(null)
  const [cartData, setCartData] = useState<CartDataI | null>(null)
  


  // get cart products ui for user 

  async function getUserCart() {
    try {
      const data: CartI = await getLoggedUserCart()

      console.log("response cart Items", data);
      setProducts(data.data.products)
      setCart(data)
      setCartData(data.data)
      console.log(cartData?.totalCartPrice);
    }
    catch (error) {
      console.log(error);

    } finally {
      setIsLoadingCartItSelf(false)
    }
  }

  useEffect(() => {
    getUserCart()

  }, [])

  if (isLoadingCartItSelf) {
    return <><div className='h-screen flex justify-center items-center'><Spinner /> Loading....</div></>
  }

  // clear cart 
  async function clearCart() {
    try {
      setIsLoading(true)
      const response = await clearProductCart()
      console.log(response);
      setProducts([])
      handleTotalCarts()

    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false)
    }
  }
  if (products.length == 0) {
    return <div className='flex items-center justify-center h-screen text-2xl italic '><p> Cart Is Empty , GO <Link href='/products' className='text-blue-600'>Shop Now 🛒 </Link> </p></div>
  }


  return (

    <main className='container mx-auto'>
      <div className="caption my-3 space-y-1">
        <h2 className='text-3xl font-bold font-sans'>Shopping Cart</h2>
        <p className='text-gray-400 text-sm'> {cart?.numOfCartItems} items in your cart</p>
      </div>

      <div className="grid grid-cols-3 gap-x-8">

        {/* left cart  */}
        <div className='col-span-2 self-start space-y-4'>

          {products.map((product) => <CartItem key={product.product._id} product={product} setProducts={setProducts} setCartData={setCartData} />)}

        </div>

        {/* right cart */}
        <div className='col-span-1 self-start '>
          <div className="shadow-md border-2 rounded-lg p-6 space-y-2 bg-white">
            <h2 className='text-md font-medium '>Order Summary</h2>
            <div className='flex justify-between'>


              <div className='space-y-2'>
                <p className='text-gray-400 text-sm'>Subtotal ({totalOfCarts})</p>
                <p className='text-gray-400 text-sm'>Shipping</p>
              </div>
              <div className='space-y-2'>
                <p className='font-medium'>{cartData?.totalCartPrice} EGP </p>
                <p className='text-green-600'>Free</p>
              </div>
            </div>
            <hr />

            <div className='space-y-4'>
              <div className="flex justify-between">
                <p className='font-medium'>Total</p>
                <p className='font-medium'>{cartData?.totalCartPrice} EGP </p>
              </div>

              <Button className='w-full py-5 rounded-lg text-[#A21A4c]' variant={'outline'}>Continue Shopping</Button>
              <br />
              {cart && <CheckOut cartId={cart?.cartId} />}
            </div>
          </div >
          <div className=' flex justify-end mt-4'>
            <Button className='text-white bg-[#A21A4c]' variant={'outline'} onClick={clearCart}>{isLoading ? <Spinner /> : "Clear Cart"}</Button>


          </div>
        </div>

      </div>
    </main>





  )
}
