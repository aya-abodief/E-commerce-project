"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgetPasswordSchema, forgetPasswordType } from '@/auth.schema/auth.schema'


export default function ForgetPasswordPage() {

    const router = useRouter()
    const form = useForm({

        resolver:zodResolver(forgetPasswordSchema),
        defaultValues:
        {
            email: "",
        }
    })
    async function handleForgetPassword(value:forgetPasswordType) {
        // console.log(values)
        try {
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                {
                    method: "POST",
                    body: JSON.stringify(value),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const data = await response.json()
            console.log("response from forget pasword", data);
            if (data.statusMsg == "success") {
                toast.success(data.message, { position: "top-center" })

               router.push('/verifyCode')
            }

        } catch (error) {
              toast.error("wrong occure", { position: "top-center" })

        }
    }

    return (
        <div className='max-w-2xl mx-auto  my-10 bg-white shadow border p-10 rounded-2xl'>



            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(handleForgetPassword)}>



                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#A21A4c] my-2 text-lg'>✦ Forget Password </FormLabel>
                                <FormControl>
                                    <Input className="rounded-full" type="email" {...field} placeholder='Enter Your email' />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }
                    >

                    </FormField >



                    <Button className="w-full rounded-full bg-[#A21A4c] hover:-translate-y-1 transition-all duration-300 ">
                        {
                            form.formState.isSubmitting ? <Spinner /> : "Verfy Email"
                        }
                    </Button>
                </form>
            </Form >
        </div>
    )
}
