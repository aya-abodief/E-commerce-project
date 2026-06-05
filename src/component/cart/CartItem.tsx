
import { removeItemFromCart, updateCartProduct } from '@/actions/productCartApis.action'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cartContext } from '@/provider/cartContext'
import { CartDataI, CartProductI } from '@/typescriptInterface/cart'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function CartItem({ product, setProducts ,setCartData }: { product: CartProductI, setProducts: (products: CartProductI[]) => void ,setCartData:(cartData: CartDataI) => void}) {

  const [isLoading, setIsLoading] = useState(false)
  const { handleTotalCarts } = useContext(cartContext)

  // remove Item 
  async function removeItem(id: string) {
    try {
      setIsLoading(true)
      const response = await removeItemFromCart(id)
      console.log("remove", response);

      if (response.status == "success") {
        toast.success("Product Removed Successfuly", { position: "top-center" })
      }
      setProducts(response.data.products)
      setCartData(response.data)
      handleTotalCarts()
    } catch (error) {
      console.log(error);
      toast.error("Wrong Occure", { position: 'top-center' })
    } finally {
      setIsLoading(false)
    }
  }
  const [isLoadingUpdated, setIsLoadingUpdated] = useState(false)

  // update item 

  async function updateProductCart(id: string, count: number) {
    try {
      setIsLoadingUpdated(true)
      const response = await updateCartProduct(id, count)
      console.log("update", response);

      if (response.status == "success") {
        toast.success("Product Updated Successfuly", { position: "top-center" })
      }

      setProducts(response.data.products)
     setCartData(response.data)
      handleTotalCarts()
    } catch (error) {
      console.log(error);
      toast.error("Wrong Occure", { position: 'top-center' })
    } finally {
      setIsLoadingUpdated(false)
    }
  }

  return (
    <div className=" lg:flex lg:justify-between lg:items-center shadow-accent border-2 rounded-xl p-6 bg-white">

      <div className='space-y-1'  >
        <div className='md:flex gap-6'>
          <Image width={100} height={100} src={product.product.imageCover} alt={product.product.title}></Image>
          <div className='flex flex-col justify-center '>
            <h2 className='text-md font-medium '>{product.product.title} </h2>
            <p className='text-gray-400 text-sm'>
              {product.product.brand.name}
              {product.product.category.name}

            </p>
            <div className='flex gap-2 mt-2   items-center'>
              <Button size="sm" variant="outline" onClick={() => updateProductCart(product.product._id, product.count - 1)} >-</Button>
              <p>{isLoadingUpdated ?
                <Spinner /> :
                <>
                  {product.count}
                </>
              }</p>
              <Button size="sm" variant="outline" onClick={() => updateProductCart(product.product._id, product.count + 1)} >+</Button>
            </div>
          </div>

        </div>



      </div>
      <div className='space-y-1'>
        <span className='text-gray-400 text-sm'>{product.count } X {product.price}</span>
        <h2>{product.price * product.count} EGP</h2>
        
        <Button className='text-white bg-[#A21A4c]' variant={'outline'} onClick={() => removeItem(product.product._id)}>
          {
            isLoading ? <Spinner /> : "Remove"
          }
        </Button>
      </div>
    </div>
  )
}
