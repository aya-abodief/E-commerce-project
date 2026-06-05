"use server"

import { getUserToken } from "@/lib/authToken"
import { addressType, changePasswordType, editProfileType } from "@/profile.schema/profile.schema"
import { OrdersI } from "@/typescriptInterface/allorders"
import { jwtDecode } from "jwt-decode"

export async function changePasswordApis(formData: changePasswordType) {
    const token = await getUserToken()
    if (!token) {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = response.json()
    return data
}

export async function editProfileApis(formData: editProfileType) {
    const token = await getUserToken()
    if (!token) {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = response.json()
    return data
}

// address

// add address 

export async function handleAddressApis(formData:addressType) {
    const token = await getUserToken()
    if (!token) {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = response.json()
    return data
}


// get all address 



export async function getAddressApis() {
    
    const token = await getUserToken()
    if (!token) {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        method: "get",
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = response.json()
    return data
}
export async function deleteAddressApis(id:string) {
    
    const token = await getUserToken()
    if (!token) {
        throw new Error(" you must Logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
        method: "Delete",
        headers: {
            "token": token,

            "Content-Type": "application/json"
        }

    })
    const data = response.json()
    return data
}


// all orders 


export async function allOrdersApi()
{
     const token = await getUserToken()
    
      const decodedToken: { id: string } = jwtDecode(token);
      console.log("decodedToken", decodedToken);
      const userId = decodedToken.id
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      const data: OrdersI[] = await response.json()
      return data
      
    
}