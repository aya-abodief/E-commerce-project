"use client"
import { changePasswordApis } from "@/actions/profile.action"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { changePasswordSchema, changePasswordType } from "@/profile.schema/profile.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function ChangePassword() {

    const form = useForm({
      resolver:zodResolver(changePasswordSchema),
    defaultValues:
    {
    
      currentPassword: "",
      password: "",
      rePassword:""
  
    }
  })

  async function handleChangePassword(values:changePasswordType)
  
{
try
{
  console.log(values)
const response =await changePasswordApis(values)



 console.log("response",response);
if(response.message=="success")
{
  toast.success("Password changed successfully" , {position:"top-center"})
}else
{
  toast.error(response.message , {position:"top-center"})
}
}catch(error)
{
toast.error("wrong occure")
}
}
  return (
    <div className="max-w-xl mx-auto bg-[#fff8fa] border-[#ebc5d3] border p-8 rounded-lg shadow-lg mt-9">
      
      <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(handleChangePassword)}>

              <FormField
                name="currentPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password </FormLabel>
                    <FormControl>
                      <Input className="rounded-full" type="number" {...field} />

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
                    <FormLabel>New password </FormLabel>
                    <FormControl>
                      <Input className="rounded-full" type="password" {...field} />

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
                    <FormLabel>Confirm password </FormLabel>
                    <FormControl>
                      <Input className="rounded-full" type="password" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >

           

          
        <Button  variant={"outline"} className="w-full rounded-full bg-[#A21A4c] text-white ">
                {
                  form.formState.isSubmitting?<Spinner />:"Save changes"
                }
                </Button>
            </form>
          </Form >
    </div>
  )
}
