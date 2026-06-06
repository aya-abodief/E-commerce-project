"use server"
 
import { getUserToken } from "@/lib/authToken"
import { checkoutType } from "@/profile.schema/profile.schema"

export async function addToCartApi(productId: string) {

    const token = await getUserToken()
    if (!token)
    {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "post",
        body: JSON.stringify({ productId: productId }),
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = response.json()
    return data
}

export async function getLoggedUserCart() {
    const token = await getUserToken()
    
     if (!token)
    {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
        method: "get",
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = await response.json()
    return data
}
export async function removeItemFromCart(productId:string) {
    const token = await getUserToken()
     if (!token)
    {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
        method: "DELETE",
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = await response.json()
    return data
}

export async function updateCartProduct(productId:string , newcount:number) {
    const token = await getUserToken()
     if (!token)
    {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
        method: "put",
        body:JSON.stringify({count:newcount}),
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = await response.json()
    return data
}


export async function clearProductCart() {

    const token = await getUserToken()
     if (!token)
    {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart` , {
        method: "DELETE",
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = await response.json()
    return data
}


export async function chickingUp(cartId:string , formData:checkoutType) {
    const token = await getUserToken()
     if (!token)
    {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` , {
        method: "post",
        body:JSON.stringify(formData),
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = await response.json()
    return data
}
export async function cashOnDeliveryApi(cartId:string , formData:checkoutType) {
    const token = await getUserToken()
     if (!token)
    {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , {
        method: "post",
        body:JSON.stringify(formData),
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = await response.json()
    return data
}






