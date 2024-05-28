import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { GlobalContext } from "@/routes/Router"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link } from "react-router-dom"

export function Products() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("GLobal context is missing")

  const { handleAddToCart, state } = context
  const getProducts = async () => {
    try {
      const res = await api.get(`/products?sort=0&search=${state.search}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  return (
    <div>
      <NavBar />
      <h1 className="text-2xl uppercase mb-10">Products</h1>
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.map((product) =>
          product.status === "Active" ? (
            <Card key={product.id} className=" w-[300px]">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={product.image} alt="" />
              </CardContent>
              <CardContent>SAR {product.price}</CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  disabled={!product.stockId}
                  onClick={() => {
                    handleAddToCart(product)
                  }}
                >
                  {product.stockId ? "Add to cart" : "Out of stock"}
                </Button>
                <Button variant="outline">
                  <Link to={`/products/${product.id}`}>Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <></>
          )
        )}
      </section>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}
