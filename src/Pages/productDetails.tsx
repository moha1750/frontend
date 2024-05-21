import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function ProductDetails() {
  const params = useParams()

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
      <div>
        <h1>{product.name}</h1>
        <img src={product.image} alt="" />
        <h1>{product.description}</h1>
      </div>
    </>
  )
}
