import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { GlobalContext } from "@/routes/Router"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link } from "react-router-dom"

export function ProductView() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("GLobal context is missing")

  const { handleAddToCart, state } = context
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
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
    <>
      <p className="mt-2 mb-10 text-3xl font-bold tracking-tight sm:text-4xl">Products</p>
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto w-full">
        <Carousel className="w-full">
          <CarouselContent className="w-full gap-2">
            {data?.map((product) => (
              <CarouselItem className=" basis-1/4" key={product.id}>
                <div className="p-1">
                  <Card key={product.id} className="w-[300px] h-[400px]">
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img src={product.image} alt="" />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={() => {
                          handleAddToCart(product)
                        }}
                      >
                        Add to cart
                      </Button>
                      <Button variant="outline">
                        <Link to={`/products/${product.id}`}>Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>{" "}
    </>
  )
}
