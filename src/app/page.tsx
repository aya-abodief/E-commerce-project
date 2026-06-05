import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Categories from "./(pages)/categories/page";
import Brand from "./(pages)/brands/page";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (

    <main className="container mx-auto space-y-3">

      <header className="grid grid-col-1 lg:grid-cols-2 gap-8   w-full h-screen  overflow-hidden"  >
        <div className=" left-0 top-10 h-full flex flex-col justify-center items-center  space-y-5">
          <h1 className=" italic text-xl md:text-5xl  font-bold text-[#3A2A40] ">Welcome <span className="text-[#F2A8C4] text-3xl md:text-6xl">to</span> ShopMart</h1>
          <p className="text-[#F2A8C4] italic text-center ">Descover the latest technology ,
            fasshion and the lifestyle products.
            Quality guaranteed with fast shipping and excellent customer service.
          </p>
          <div className="mt-5">

            <Link href={"/products"}>
              <Button className="bg-[#3A2A40] mr-5 px-10 py-7 rounded-full  border-0 text-lg  hover:-translate-y-1 hover:translate-x-0.5 transition-all ease-in-out duration-300">Shop Now <span><ArrowRight /></span> </Button>
            </Link>

            <Button variant="outline" className="  px-10 py-7 rounded-full  text-lg hover:bg-green-600 transition-all duration-300 ease-in-out border">Browse Categories</Button>
          </div>
        </div>


        <div className="relative flex items-center rounded-4xl overflow-hidden  ">
          <Image height={1000} width={1000} src={"/531 (1).jpg"} alt="header image" className=" w-full object-cover rounded-4xl shadow-2xl " />

    
        </div>
      </header>


      <div className="category">
        <p className="text-[#F2A8C4] text-center ">✦ Browse By Mode</p>

        <Categories />
      </div>

      <div className="mt-15">
        <p className="text-[#F2A8C4] text-center ">✦ Petal-approved</p>
        <Brand />
      </div>


      <div className=" py-5 text-center flex flex-col space-y-7">
        <h2 className="flex justify-center items-center gap-5 "><span className="text-4xl text-[#3A2A40]">✦ Made With </span><span><Heart className="text-[#A21A4c]" size={50} /></span> </h2>
<p className="text-muted-foreground italic"> 
        Sign up to save your favorites, track orders and unlock member perks.

</p>
        <div>
          <Link href={"/register"}>
            <Button className="bg-[#3A2A40] mr-5 p-7 rounded-full  border-0 text-md hover:-translate-y-1 hover:translate-x-0.5 transition-all ease-in-out duration-300">Create Account </Button>
          </Link>
          <Link href={"/login"}>
            <Button variant="outline" className="hover:bg-green-600 transition-all duration-300 ease-in-out  px-10 py-7 rounded-full  border text-lg">Sign In</Button>
          </Link>
        </div>
      </div>
    </main>

  )
}
