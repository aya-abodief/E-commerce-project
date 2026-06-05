
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

export default function Footer() {
    return (
        <div className='border-t border-[#F5C9B8] mt-10'>
  <div className='container mx-auto '>
            <main className=' grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5  gap-10 mt-10'>
                <div className='space-y-4'>
                    <div className='flex items-center gap-1'>
                        <Avatar className="p-3 bg-black rounded-lg flex items-center justify-center">
                            <AvatarFallback className="flex items-center justify-center w-full h-full text-white font-bold text-2xl leading-none">
                                S
                            </AvatarFallback>

                        </Avatar>
                        <h3 className='font-bold text-lg'>ShopMart</h3>
                    </div>
                    <p className='text-gray-600 text-md leading-relaxed'>
                        Your one-stop destination for the latest technology,
                        fashion, and lifestyle products.
                        Quality guaranteed with fast shipping and excellent customer service.
                    </p>
                    <ul  className='text-gray-600 font-sans text-sm space-y-2.5'>

                        <li className='flex items-center gap-1.5'><span><MapPin  size={16} /></span> 123 Shop Street, Octoper City, DC 12345</li>
                        <li  className='flex items-center gap-1.5'><span><Phone size={16} /></span> (+20) 01093333333</li>
                        <li  className='flex items-center gap-1.5'><span><Mail size={16} /></span> support@shopmart.com</li>
                    </ul>
                </div>
                <div className='space-y-3'>
                    <h3 className='font-bold text-md'>SHOP</h3>
                    <ul className='text-gray-600 space-y-2.5'>
                        <li>    Electronics</li>
                        <li>    Fashion</li>
                        <li>   Home & Garden</li>
                        <li>     Sports</li>
                        <li>    Deals</li>
                    </ul>
                </div>

                <div className='space-y-3'>
                    <h3 className='font-bold text-md'>CUSTOMER SERVICE</h3>
                    <ul className='text-gray-600 space-y-2.5'>
                        <li>    Contact Us</li>
                        <li>      Help Center</li>
                        <li>  Track Your Order</li>
                        <li>     Returns & Exchanges</li>
                        <li>    Size Guide</li>
                    </ul>
                </div>
                <div className='space-y-3'>
                    <h3 className='font-bold text-md'>ABOUT</h3>
                    <ul className='text-gray-600 space-y-2.5'>
                        <li>About shopmart</li>
                        <li>Careers</li>
                        <li>Press</li>
                        <li>Investor Relations</li>
                        <li>Sustainability</li>
                    </ul>

                </div>
                <div className='space-y-3'>
                    <h3 className='font-bold text-md'>POLICIES</h3>
                    <ul className='text-gray-600 space-y-2.5'>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>Cookie Policy</li>
                        <li>Shipping Policy</li>
                        <li>Refund Policy</li>
                    </ul>

                </div>

            </main>
        </div>
        </div>
      
    )
}
