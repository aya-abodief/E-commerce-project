"use client"
import React, { useContext } from 'react'
import {
  Avatar,

  AvatarFallback,

} from "@/components/ui/avatar"
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, TextAlignJustify, UserRound } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { cartContext } from '@/provider/cartContext'
import { Spinner } from '@/components/ui/spinner'
import { wishListContext } from '@/provider/wishListProvider'
export default function Navbar() {

  const { data: session, status } = useSession()

  console.log("session", session)

  const { totalOfCarts, isLoading } = useContext(cartContext)
  const { totalWishes } = useContext(wishListContext)

  return (
    <nav className=' bg-[#A21A4c] shadow-xl p-5 fixed top-0 right-0 left-0 z-50 '>
      <div className="container mx-auto flex justify-between items-center">
        <div className="nav-logo flex items-center gap-1 ">
          <Avatar className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <AvatarFallback className="flex items-center justify-center w-full h-full text-[#A21A4c] font-bold text-2xl leading-none">
              S
            </AvatarFallback>
          </Avatar>

          <Link href="/" className='text-white font-bold text-lg leading-none'>ShopMart</Link>
        </div>
        <div className="hidden md:block nav-links text-white text-bold ">
          <NavigationMenu >
            <NavigationMenuList className='gap-2'>
              <NavigationMenuItem>
                <NavigationMenuLink asChild >
                  <Link href="/products" className='font-semibold text-lg'>Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild >
                  <Link href="/brands" className='font-semibold text-lg'>Brand</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild >
                  <Link href="/categories" className='font-semibold text-lg '>Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex nav-actions  items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className='flex gap-2 text-white'>
                {status == "loading" ? null : session && `Welcome,${session.user.name?.split(" ")[0]}`}
                <UserRound className='text-md text-white cursor-pointer' />
              </p>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>

            

                {status == "loading" ? null : session ? <>
                    <DropdownMenuItem asChild >
                  <Link href="/profile"> My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/allorders">Your Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { signOut({ callbackUrl: ("/login") }) }} className='cursor-pointer'>
                    Log Out
                  </DropdownMenuItem>
                </> : <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>

                </>}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>


          {session && <Link href="/cart" className='relative text-white'>
            <ShoppingCart />
            <Badge className='bg-white text-[#A21A4c] font-bold  absolute bottom-full start-full -translate-x-1/2  translate-y-1/2'>
              {isLoading ? <Spinner /> : totalOfCarts}

            </Badge>
          </Link>}
          {session && <Link href="/wishList" className='relative text-white'>
            <Heart />
            <Badge className='bg-white text-[#A21A4c] font-bold  absolute bottom-full start-full -translate-x-1/2  translate-y-1/2'>
              {/* {isLoading} */}
              {totalWishes}
            </Badge>
          </Link>}
        </div>

        {/* drop Dowen Mobile abb */}

        <div className='md:hidden'>

          <DropdownMenu  >
            <DropdownMenuTrigger asChild>
              <TextAlignJustify className='cursor-pointer text-white' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-3xl px-4 bg-[#A21A4c] text-white border-none mt-6 rounded-none">

              <DropdownMenuItem asChild>
                <Link href="/" className='font-md text-lg  '>Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products" className='font-md text-lg'>Products</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/brands" className='font-md text-lg'>Brand</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/categories" className='font-md text-lg '>Categories</Link>
              </DropdownMenuItem>


            </DropdownMenuContent>
          </DropdownMenu>
        </div>


      </div>
      <div className='fixed bottom-0 right-0 left-0 flex justify-around py-5 bg-white md:hidden'>
        <Link href="/profile" className='text-white'>
          <UserRound className='text-md text-[#A21A4c]  cursor-pointer' />
        </Link>
        {session && <Link href="/cart" className='relative text-white'>
          <ShoppingCart className='text-[#A21A4c] '/>
          <Badge className='bg-amber-200 text-[#A21A4c] font-bold  absolute bottom-full start-full -translate-x-1/2  translate-y-1/2'>
            {isLoading ? <Spinner /> : totalOfCarts}

          </Badge>
        </Link>}
        {session && <Link href="/wishList" className='relative text-white'>
          <Heart className='text-[#A21A4c] ' />
          <Badge className='bg-amber-200 text-[#A21A4c] font-bold  absolute bottom-full start-full -translate-x-1/2  translate-y-1/2'>
            {/* {isLoading} */}
            {totalWishes}
          </Badge>
        </Link>}
      </div>
    </nav>
  )
}
