import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Cart } from "@/Pages/Cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { GlobalContext } from "@/routes/Router"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link } from "react-router-dom"

type OrderItems = {
  quantity: number
  amount: number
  stockId: string
  status: "Card"
}
type OrderCheckout = OrderItems[]

export function Checkout() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("GLobal context is missing")
  const { handleAddToCart, handleDeleteFromCart, state, handleRemoveFromCart } = context
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.stockId
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [productId: string]: Product[] })
  // Queries
  const {
    data: products,
    error,
    isPending
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  const handleCheckout = async () => {
    try {
      const checkoutOrder: OrderCheckout = []

      Object.keys(groups).forEach((key) => {
        const products = groups[key]
        checkoutOrder.push({
          quantity: products.length,
          amount: 0,
          stockId: key,
          status: "Card"
          // it should be fixed ask for help
        })
      })
      const token = localStorage.getItem("token")
      const res = await api.post("/payment", checkoutOrder, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status === 201) {
        handleRemoveFromCart()
      }
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  if (isPending) {
    return <p>Loading...</p>
  }
  if (!products) {
    return <p>Not found</p>
  }
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center border-b  py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <Link to="/categories" className="text-2xl font-bold ">
          Shop more!
        </Link>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative"></div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 object-contain">
        <p className="text-xl font-medium">Order Summary</p>
        <p></p>
        <Table className="object-contain">
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell  text-center"></TableHead>
              <TableHead className="hidden sm:table-cell  text-center"></TableHead>
              <TableHead className="hidden sm:table-cell  text-center"></TableHead>
              <TableHead className="hidden sm:table-cell  text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Card className="w-full  object-contain">
              <CardContent>
                <TableRow>
                  {Object.keys(groups).length > 0 ? (
                    Object.keys(groups).map((key) => {
                      const products = groups[key]
                      const product = products[0]
                      return (
                        <div
                          className="mb-4 flex items-center gap-4 object-contain"
                          key={product.id}
                        >
                          <TableCell>
                            <img className="w-10 h-10 object-contain" src={product.image} alt="" />
                          </TableCell>
                          <TableCell>
                            <h3>{product.name}</h3>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              onClick={() => handleDeleteFromCart(product.id)}
                            >
                              -
                            </Button>
                          </TableCell>
                          <TableCell>
                            <span className="font-bold">{products.length}</span>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" onClick={() => handleAddToCart(product)}>
                              +
                            </Button>
                          </TableCell>
                          <TableCell>
                            <p>price:{product.price}</p>
                          </TableCell>
                        </div>
                      )
                    })
                  ) : (
                    <TableCell>
                      <h3>Cart is Empty </h3>
                    </TableCell>
                  )}
                </TableRow>
              </CardContent>
            </Card>
          </TableBody>
        </Table>
        <div className="mt-10  px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p>Complete your order by providing your payment details.</p>
          <div>
            <Label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border  px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 "
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
            </div>
            <Label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">
              Card Holder
            </Label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border  px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10"
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"></div>
            </div>
            <Label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">
              Card Details
            </Label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <Input
                  type="text"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border  px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 "
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    className="h-4 w-4 "
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
              </div>
              <Input
                type="text"
                name="credit-expiry"
                className="w-full rounded-md border  px-2 py-3 text-sm shadow-sm outline-none focus:z-10 "
                placeholder="MM/YY"
              />
              <Input
                type="text"
                name="credit-cvc"
                className="w-1/6 flex-shrink-0 rounded-md border  px-2 py-3 text-sm shadow-sm outline-none focus:z-10 "
                placeholder="CVC"
              />
            </div>
            <Label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">
              Billing Address
            </Label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <Input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  className="w-full rounded-md border  px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 "
                  placeholder="Address"
                />
              </div>

              <Input
                type="text"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border  px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 "
                placeholder="ZIP"
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium ">Total Products</p>
                <p className="font-semibold ">{products.length}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium ">Total</p>
              {/* <p className="text-2xl font-semibold ">{total}</p> */}
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            className="mt-4 mb-8 w-full rounded-md  px-6 py-3 font-medium "
          >
            Place Order
          </Button>
        </div>
      </div>
    </>
  )
}
