
"use client"
import * as React from "react"

import { useForm } from "react-hook-form"


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, registerType } from "@/auth.schema/auth.schema"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"




export default function Register() {

  const router = useRouter()
  const form = useForm({

    resolver: zodResolver(registerSchema),
    defaultValues:
    {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }
  })

  async function handleRegister(values: registerType) {
    console.log(values)

try{
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "post",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json()
    console.log("data from register", data)
    if (data.message == "success") {
       toast.success("register successfully" , {position:"top-center"})
      router.push("/login")
    }
    if(data.statusMsg=="fail"){
       toast.error(data.message , {position:"top-center"})
    }
}catch(error){
 toast.error("wrong occure" , {position:"top-center"})
}

  }


  return (
    <>
      <main >
        <div className="max-w-2xl mx-auto mt-10 border shadow-lg p-8 rounded-xl bg-white ">
     <div className="space-y-5">
           <p className="text-[#A21A4c]">✦ Hello, new friend</p>

          <h2 className="text-3xl font-semibold mb-6">Create your account.</h2>
     </div>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(handleRegister)}>


              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name </FormLabel>
                    <FormControl>
                      <Input className="rounded-full" type="text" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                      <Input className="rounded-full"  type="email" {...field} />

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
                      <Input className="rounded-full"  type="password" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >

              <FormField
                name="rePassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RePassword </FormLabel>
                    <FormControl>
                      <Input className="rounded-full"  type="password" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >

              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone </FormLabel>
                    <FormControl>
                      <Input className="rounded-full"  type="text" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >

               <p className="flex justify-start  text-[#A21A4c] text-sm  mb-2 ">You already have an account? <Link href={"/login"} className="underline text-blue-500 cursor-pointer px-1.5">Login Now</Link></p>
              <Button className="w-full rounded-full bg-[#A21A4c] hover:-translate-y-1 transition-all duration-300 ">
                {
                  form.formState.isSubmitting ? <Spinner /> : " Create Account"
                }
              </Button>
            </form>
          </Form >

        </div>
      </main>

    </>
  )
}

