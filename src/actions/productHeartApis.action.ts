
"use server"

import { getUserToken } from "@/lib/authToken"

export async function addToHeartApi(productId: string) {

    const token = await getUserToken()
    if (!token) {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
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

// get logged 


export async function getLoggedWishList() {

    const token = await getUserToken()
    if (!token) {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {

        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = response.json()
    return data
}

// remove 

export async function removeItemFrmWishListApis(productId: string) {

    const token = await getUserToken()
    if (!token) {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        method: "delete",
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = response.json()
    return data
} 
