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
import { resetCodeSchema, resetCodeType } from '@/auth.schema/auth.schema'


export default function resetCode() {

    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(resetCodeSchema),

        defaultValues:
        {
            resetCode: "",
        }
    })
    async function handleResetCode(value: resetCodeType) {
        // console.log(values)
        try {
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                {
                    method: "POST",
                    body: JSON.stringify(value),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const data = await response.json()
            console.log("response from reset code", data);
            if (data.status == "Success") {
                toast.success(data.status, { position: "top-center" })

                router.push('/resetPassword')
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
                <form className="space-y-8" onSubmit={form.handleSubmit(handleResetCode)}>



                    <FormField
                        name="resetCode"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-[#A21A4c] my-2 text-lg'>✦ Reset Password code  </FormLabel>
                                <FormControl>
                                    <Input className="rounded-full" type="number" {...field} placeholder='Enter reset code' />

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                        }
                    >

                    </FormField >



                    <Button className="w-full rounded-full bg-[#A21A4c] hover:-translate-y-1 transition-all duration-300 ">
                        {
                            form.formState.isSubmitting ? <Spinner /> : "Verify code"
                        }
                    </Button>
                </form>
            </Form >
        </div>
    )
}
