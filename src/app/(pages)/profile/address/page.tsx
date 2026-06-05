"use client"
import {  deleteAddressApis, getAddressApis, handleAddressApis } from "@/actions/profile.action"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { addressSchema, addressType } from "@/profile.schema/profile.schema"
import { addressI } from "@/typescriptInterface/allorders"
import { zodResolver } from "@hookform/resolvers/zod"
import { House, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from "sonner"





export default function AddressPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const [addresses, setAddresses] = useState<addressI[] | []>([])


  const { data: session, status } = useSession()


  const form = useForm({
    resolver:zodResolver(addressSchema) ,
    defaultValues:
    {

      name: "",
      details: "",
      phone: "",
      city: ""

    }
  })


  // adding address 

  async function handleAddress(values: addressType) {
    try {
      console.log(values)
      const response = await handleAddressApis(values)
      console.log("response from address", response);
      if (response.status == "success") {
        toast.success(response.message, { position: "top-center" })
        getAllAddresses()
      }
    } catch (error) {
      toast.error("wrong occure", { position: "top-center" })
    } finally {
      setShowForm(false)
    }
  }


  // get all address 
  async function getAllAddresses() {

    try {
      const response = await getAddressApis()
      console.log("all addresses", response);
      setAddresses(response.data)
    } catch (error) {
      console.log(error);
    }


  }

  useEffect(() => {
    getAllAddresses()
  }
    , [])


  // delete address

  async function deleteAddress(id: string) {
    try {
      setIsLoading(true)
      const response = await deleteAddressApis(id)
      console.log(response);
      if (response.status == "success") {
        toast.success(response.message, { position: "top-center" })
        getAllAddresses()
      }

    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="">

      {showForm &&

        <div className="max-w-xl mx-auto bg-[#fff8fa] border-[#ebc5d3] border p-8 rounded-lg shadow-lg mt-9">
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(handleAddress)}>

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>address</FormLabel>
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
                name="details"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details of address</FormLabel>
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
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>phone </FormLabel>
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
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>city </FormLabel>
                    <FormControl>
                      <Input className="rounded-full" type="text" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >




              <Button variant={"outline"} className="w-full rounded-full bg-[#A21A4c] text-white " >
                {
                  form.formState.isSubmitting ? <Spinner /> : "Save changes"
                }
              </Button>
            </form>
          </Form >
        </div>

      }


      <div className="grid grid-cols-1 p-3 gap-4  m-2">
        {
          !showForm && addresses.length > 0 && addresses.map((addres) => <div key={addres._id} className="p-4 border bg-white shadow rounded-2xl">
            <div >
          <div className="flex items-center gap-1 mb-1"><p className="bg-green-600 p-3 rounded-full inline-block text-white"><House size={15} /> </p> <span className="px-1 text-[#A21A4c] ">Your address</span></div>
              <p >{session?.user.name}</p>
              <p className="text-muted-foreground">{addres.name} , {addres.details} ,{addres.city}  </p>

              <p className="text-muted-foreground">{addres.phone}</p>


              <div className="flex justify-end text-[#A21A4c]">
                <button onClick={() => deleteAddress(addres._id)}>
                  {isLoading ? <Spinner /> : <div className="flex gap-0.5 items-center"> <Trash2 /><span>Delete</span></div>}
                </button>
              </div>
            </div>
          </div>)
        }
      </div>



      {!showForm && <div className="flex items-center justify-center">
        <Button className="bg-[#A21A4c] w-full" onClick={() => setShowForm(true)}>Add new address</Button>
      </div>}


    </div>



  )

}
