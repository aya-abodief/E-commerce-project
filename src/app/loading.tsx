import { Spinner } from '@/components/ui/spinner'
import React from 'react'

export default function Loading() {
  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
   <Spinner className='text-3xl' />
    </div>
  )
}
