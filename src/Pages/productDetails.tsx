import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GlobalContext } from "@/routes/Router"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link, useParams } from "react-router-dom"

export function ProductDetails() {
  const params = useParams()
  const context = useContext(GlobalContext)
  if (!context) throw Error("")
  const { state, handleDeleteFromCart, handleAddToCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {})
  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${params.productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!product) {
    return <p>Not found</p>
  }
  return (
    <>
      <NavBar />
      <div className="w-full grid grid-cols-2">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardContent>
              <img src={product.image} alt="" />
            </CardContent>
            <CardContent>SAR{product.price}</CardContent>
          </CardHeader>
        </Card>

        <div className="w-full grid grid-cols-2">
          <Card className="w-full ">
            <CardHeader>
              {Object.keys(groups).length > 0 ? (
                Object.keys(groups).map((key) => {
                  const products = groups[key]
                  const product = products[0]
                  return (
                    <div className="mb-4 flex items-center gap-4" key={product.id}>
                      <img className="w-10 h-10 object-contain" src={product.image} alt="" />
                      <h3>{product.name}</h3>
                      <Button variant="outline" onClick={() => handleDeleteFromCart(product.id)}>
                        -
                      </Button>
                      <span className="font-bold">{products.length}</span>
                      <Button variant="outline" onClick={() => handleAddToCart(product)}>
                        +
                      </Button>
                    </div>
                  )
                })
              ) : (
                <h3>Cart is Empty </h3>
              )}
              <Button
                onClick={() => {
                  handleAddToCart(product)
                }}
              >
                Add to cart
              </Button>
              <Link to="/checkout">
                <Button className="w-full">Checkout</Button>
              </Link>
            </CardHeader>
          </Card>
        </div>
        <div className="mt-6 flex flex-col items-center align-text-top py-8 border-t border-b">
          <p>About Product </p>
          <p>{product.description}</p>
        </div>
      </div>
    </>
  )
}
