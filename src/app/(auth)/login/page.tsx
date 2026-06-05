"use client"
import * as React from "react"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, loginType } from "@/auth.schema/auth.schema"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"



export default function Login() {

  const router = useRouter()

  const form = useForm({

    resolver: zodResolver(loginSchema),
    defaultValues:
    {

      email: "",
      password: "",

    }
  })

  async function handleLogin(values: loginType) {
    // console.log(values)
    const response = await signIn("credentials",
      {
        email: values.email,
        password: values.password,
        redirect: false
      }
    )
    console.log("response", response);
    if (response?.ok) {
      router.push('/products')
    }
  }


  return (
    <>
      <main>
        <div className="max-w-2xl mx-auto  mt-10 border shadow-lg p-8 rounded-xl">
          <p className="text-[#A21A4c] text-2xl pb-10">✦ Welcome back</p>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(handleLogin)}>



              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                      <Input className="rounded-full" type="email" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password </FormLabel>
                    <FormControl>
                      <Input className="rounded-full" type="password" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >
              <p className="flex justify-start  text-[#A21A4c] text-sm  mb-2 ">You don't have an account? <Link href={"/register"} className="underline text-blue-500 cursor-pointer px-1.5">Register Now</Link></p>
              <Link href={"/forgetPassword"}>
                <p className="flex justify-end underline text-[#A21A4c] text-sm cursor-pointer mb-2 ">Forgot password ?</p>
              </Link>



              <Button className="w-full rounded-full bg-[#A21A4c] hover:-translate-y-1 transition-all duration-300 ">
                {
                  form.formState.isSubmitting ? <Spinner /> : "Sign in"
                }
              </Button>
            </form>
          </Form >

        </div>
      </main>

    </>
  )
}

