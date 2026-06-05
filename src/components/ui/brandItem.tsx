import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IBrand } from "@/typescriptInterface/brand"
import Image from "next/image"
import Link from "next/link"

export function BrandCart({ brand }: { brand: IBrand }) {

  
  return (


    <Link href={`/brands/${brand._id}`}>
      <Card className=" group w-full rounded-3xl border-2 border-[#F5C9B8] shadow-sm  hover:shadow-lg hover:-translate-y-2 transition-all ease-in-out  duration-300 p-4">
        <CardHeader className="flex items-center justify-center ">
          <Image width={200} height={200} src={brand.image} alt={brand.name} className=" group-hover:-rotate-4 transition-all ease-in-out  duration-300  rounded-full h-50 " />
        </CardHeader>


        <CardFooter>
          <h2 className="font-bold text-xl  text-center ">{brand.name}</h2>
        </CardFooter>
      </Card>

    </Link>



  )
}

