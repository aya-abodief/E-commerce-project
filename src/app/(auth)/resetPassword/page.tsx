"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema, resetPasswordType } from '@/auth.schema/auth.schema'

export default function ResetPasswoedPage() {
    const router = useRouter()
    const form = useForm({

        resolver:zodResolver(resetPasswordSchema) ,
        defaultValues:
        {
            email: "",
            newPassword: ""
        }
    })

    async function handleForgetPassword(value: resetPasswordType) {

        try {
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                {
                    method: "PUT",
                    body: JSON.stringify(value),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const data = await response.json()
            console.log("response from reset Password", data);
            if (data.token) {
                toast.success("success", { position: "top-center" })
            await signIn("credentials", {
                    email:value.email,
                    password:value.newPassword,
                    redirect: false
                })
                router.push("/")
                

            }
            else {
                toast.error(data.message, { position: "top-center" })
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
                                <FormLabel className='text-[#A21A4c] mb-3 text-lg'> Reset Password</FormLabel>
                                <FormControl>
                                    <Input className="rounded-full" type="email" {...field} placeholder='Enter Your email' />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }
                    >

                    </FormField >
                    <FormField
                        name="newPassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#A21A4c]  text-lg'></FormLabel>
                                <FormControl>
                                    <Input className="rounded-full" type="password" {...field} placeholder='Enter new password' />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }
                    >

                    </FormField >




                    <Button className="w-full rounded-full bg-[#A21A4c] hover:-translate-y-1 transition-all duration-300 ">
                        {
                            form.formState.isSubmitting ? <Spinner /> : "Reset Password"
                        }
                    </Button>
                </form>
            </Form >

        </div>
    )
}
