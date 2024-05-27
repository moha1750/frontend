import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlobalContext } from "@/routes/Router"
import { Category, Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link, useParams } from "react-router-dom"

export function CategoryDetails() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is Missing")
  const { handleAddToCart, state } = context
  const params = useParams()
  const getCategories = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: categories, error: catError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories
  })
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
  const { data: products, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })
  const productWithCat = products?.filter((product) => product.categoryId === params.categoryId)

  return (
    <>
      <NavBar />
      <div className="w-full grid grid-cols-2">
        {productWithCat?.map((product) => (
          <Card key={product.name} className="w-1/2">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardContent>
                <img src={product.image} alt="" />
              </CardContent>
              <CardContent>Price:({product.price})</CardContent>
              <CardDescription>{product.description}</CardDescription>
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
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  )
}
