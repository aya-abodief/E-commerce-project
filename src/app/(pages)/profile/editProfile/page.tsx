
"use client"

import { changePasswordApis, editProfileApis } from "@/actions/profile.action"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { editProfileSchema, editProfileType } from "@/profile.schema/profile.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React from 'react'
import { useForm } from "react-hook-form"
import { toast } from "sonner"
export default function EditProfile() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const form = useForm({

    resolver : zodResolver(editProfileSchema),
    defaultValues:
    {

      name: "",
      email: "",
      phone: ""

    }
  })


  async function handleEditProfile(values: editProfileType) {

    try {
      console.log(values)
      const response = await editProfileApis(values)
      console.log("response of editing", response);
      if (response.message == "success") {
        toast.success("Profile Edited Successfully Please Login with new email ", { position: "top-center" })
        router.push('/login')

      } else {
        toast.error(response.errors.msg, { position: "top-center" })
      }
    }
    catch (error) {
      toast.error("wrong occure")
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-[#fff8fa] border-[#ebc5d3] border p-8 rounded-lg shadow-lg mt-9">
      <Form {...form}>
        <form className="space-y-8 text-[#33141c]" onSubmit={form.handleSubmit(handleEditProfile)}>

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel> Name </FormLabel>
                <FormControl>
                  <Input  className="border-[#ebced8] rounded-full " type="text" {...field} placeholder={session?.user.name||"enter new name"}  />

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
                  <Input className="border-[#ebced8] rounded-full " type="email" {...field} placeholder={session?.user.email ||"enter new email"} />

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
                  <Input className="border-[#ebced8] rounded-full" type="number" {...field}  />

                </FormControl>
                <FormMessage />
              </FormItem>
            )
            }
          >

          </FormField >




          <Button  className="w-full  bg-[#A21A4c] rounded-full text-white ">
            {
              form.formState.isSubmitting ? <Spinner /> : " Save Changes "
            }
          </Button>
        </form>
      </Form >
    </div>
  )
}
