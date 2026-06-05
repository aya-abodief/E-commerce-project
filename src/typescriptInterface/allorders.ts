
import { CartProductI } from './cart';


export interface OrdersI {
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: CartProductI[]
  paidAt?: string
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
  postalCode?: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}


export interface addressI {
  _id: string
  name: string
  details: string
  phone: string
  city: string

}