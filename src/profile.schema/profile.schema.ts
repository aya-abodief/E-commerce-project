
import * as z from 'zod'


export const addressSchema = z.object({
    name: z.string().nonempty("Address is required"),
    details: z.string().nonempty(" details address is required"),
    phone: z.string().nonempty(" phone number is required"),
    city: z.string().nonempty(" city is required")
})

export type addressType = z.infer<typeof addressSchema>

// change password 

export const changePasswordSchema = z.object({
 currentPassword: z.string().nonempty(" current password is required"),
 password: z.string().nonempty(" password must be valid").min(6,"passwored must at least 6 character  "),
 rePassword: z.string().nonempty("repassword must match with password").min(6,"passwored must at least 6 character  ")
}).refine((data)=>data.password==data.rePassword,{
    path:["repassword"],
    error:"repassword must be match with password"
})
  
export type changePasswordType = z.infer<typeof changePasswordSchema>

// edit profile 

export const editProfileSchema = z.object({
   name: z.string().nonempty("name is required"),
   email: z.email().nonempty("email is required"),
   phone: z.string().nonempty("phone is required")
})


export type editProfileType = z.infer<typeof editProfileSchema>


// check out schema 

export const checkoutSchema = z.object({
  shippingAddress:z.object({
   details: z.string().nonempty(" details address is required"),
    phone: z.string().nonempty(" phone number is required").regex(/^01[0125][0-9]{8}$/," phone number must be egyption"),
    city: z.string().nonempty(" city is required")
  })
 
})

export type checkoutType = z.infer<typeof checkoutSchema>