
import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty("please enter your name")
        .min(3, "name msut at least 3 characters"),

    email: z.email().nonempty("Please enter your valid email"),
    password: z.string().nonempty("Enter valid password").min(6, "at least 6 characters"),
    rePassword: z.string().nonempty("RePassword must match password").min(6, "at least 6 characters"),
    phone: z.string().nonempty("Phone must be egyption number").regex(/^01[1205][0-9]{8}$/)
}).refine((data) => data.password == data.rePassword, {

    path: ["rePassword"],
    message: "RePassword dosn't match Password "
})

export type registerType = z.infer<typeof registerSchema>


// login schema 

export const loginSchema = z.object({

    email: z.email().nonempty("Please enter your valid email"),
    password: z.string().nonempty("Enter valid password").min(6, "at least 6 characters"),

})


export type loginType = z.infer<typeof loginSchema>


// forget password 

export const forgetPasswordSchema = z.object({

    email: z.email().nonempty("Please enter your email"),


})

export type forgetPasswordType = z.infer<typeof forgetPasswordSchema>


// reset code 


export const resetCodeSchema = z.object({

    resetCode: z.string().nonempty("Please enter verify code from your email"),


})

export type resetCodeType = z.infer<typeof resetCodeSchema>


// reset password 

export const resetPasswordSchema = z.object({

    email: z.email().nonempty("Please enter your  email"),
    newPassword: z.string().nonempty("Enter valid password").min(6, "at least 6 characters"),

})
export type resetPasswordType = z.infer<typeof resetPasswordSchema>