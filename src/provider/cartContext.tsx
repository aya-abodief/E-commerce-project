"use client"

import { getLoggedUserCart } from '@/actions/productCartApis.action'
import { CartI } from '@/typescriptInterface/cart'
import React, { createContext, useEffect, useState } from 'react'

interface cartContextI {
  totalOfCarts: number,
  handleTotalCarts: () => void,
  isLoading:boolean,
  cartId:string
}

export const cartContext = createContext<cartContextI>({
  totalOfCarts: 0,
  handleTotalCarts: () => {},
  isLoading:false,
  cartId:""

})
export default function CartContextProvider({ children }: { children: React.ReactNode }) {

  const [totalOfCarts, setTotalOfCarts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
const [cartId,setCartId] = useState("")
  async function handleTotalCarts() {

    try {
      setIsLoading(true)
      const data: CartI = await getLoggedUserCart()
      const total = data.data.products.reduce((accu, product) => product.count + accu, 0)
      setTotalOfCarts(total)
      setCartId(data.cartId)
    } catch (error) {
      console.log(error);


    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleTotalCarts()
  }, [])

  return (
    <div>
      <cartContext.Provider value={{ totalOfCarts, handleTotalCarts , isLoading,cartId }}>
        {children}
      </cartContext.Provider>
    </div>
  )
}
