import { ICategory } from "./category"
import { ISubcategory } from "./subcategory"



export interface IBrandDetails {
  sold: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  availableColors: unknown[]
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}
export interface IBrand {
  _id: string
  name: string
  slug: string
  image: string
}
