import { IBrand } from "./brand"
import { ISubcategory } from "./subcategory"

export interface ICategory {
  _id: string
  name: string
  slug: string
  image: string
}
export interface ICategoryDetail {
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
  priceAfterDiscount?: number
  imageCover: string
  category: ICategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}