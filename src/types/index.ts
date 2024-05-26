export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  role: number
}
export type Category = {
  id: string
  name: string
  description: string
  status: string
  image: string
}
export type Product = {
  id: string
  name: string
  image: string
  description: string
  categoryId: string
  status: string
  categoryName: string
}
export type Order = {
  id: string
  status: number
  date: Date
  userId: string
  paymentId: string
}
export type Stock = {
  id: string
  price: number
  quantity: number
  size: string
  color: string
  productId: string
}
export type orderStock = {
  id: string
  price: number
  quantity: number
  orderId: string
  stockId: string
}
export type Payment = {
  id: string
  amount: number
  method: string
  date: Date
  userId: string
}
export type Review = {
  id: string
  rating: string
  comment: string
  userId: string
}
export type Shipping = {
  id: string
  trackingNo: string
  deliveryMethod: string
  date: Date
  addressId: string
  orderId: string
}
export type Wishlist = {
  id: string
  name: string
  userId: string
}
export type Address = {
  id: string
  city: string
  zip: string
  addressLine: string
  userId: string
}

export type DecodedUser = {
  aud: string
  emailaddress: string
  exp: number
  iss: string
  name: string
  nameidentifier: string
  role: "Admin" | "Customer"
  password: string
}
