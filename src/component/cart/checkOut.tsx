"use client"

import { cashOnDeliveryApi, chickingUp } from "@/actions/productCartApis.action"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { checkoutSchema, checkoutType } from "@/profile.schema/profile.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"


export function CheckOut({ cartId }: { cartId: string }) {

  const [paymentMethod, setPayMentMethod] = useState("")

  const router = useRouter()
  const form = useForm({

    resolver:zodResolver(checkoutSchema),
    defaultValues:
    {

      shippingAddress: {
        details: "",
        phone: "",
        city: ""
      }

    }
  })
  async function handleCheckOut(values: checkoutType) {

    if (paymentMethod == "online") {
      const response = await chickingUp(cartId, values)
      console.log("response from ONLINEPAYMENT",response);

      if (response.status == "success") {
        window.location.href = response.session.url
      }
    }
    if (paymentMethod == "cash") {
      const response = await cashOnDeliveryApi(cartId, values)
      console.log("response from cashPAYMENT",response);

      if (response.status == "success") {
        router.push("/allorders")
      }
    }

    console.log(values)
    console.log("cartId", cartId);


  }


  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='w-full py-5 rounded-lg '>Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle> CheckOut</DialogTitle>
            <DialogDescription>
              Complete the following information for checking out
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(handleCheckOut)}>



              <FormField
                name="shippingAddress.details"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >

              <FormField
                name="shippingAddress.phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone </FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >

              <FormField
                name="shippingAddress.city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City </FormLabel>
                    <FormControl>
                      <Input type="city" {...field} />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              >

              </FormField >
              <div className="flex gap-5 ">
                <div className="space-x-2 border w-full px-1 py-3 cursor-pointer hover:bg-amber-50">

                  <input className="" type="radio" name="payment" value={"online"} onChange={(e) => setPayMentMethod(e.target.value)} /><span>Online</span>
                </div>

                <div className="space-x-2 border w-full px-1 py-3 cursor-pointer hover:bg-amber-50">

                  <input type="radio" name="payment" value={"cash"} onChange={(e) => setPayMentMethod(e.target.value)} /> <span>Cash on delivery</span>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">

                  {
                    form.formState.isSubmitting ? <Spinner /> : "Place Order"
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form >
        </DialogContent>
      </form>



    </Dialog>
  )
}
