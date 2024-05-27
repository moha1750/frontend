import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { GlobalContext } from "@/routes/Router"
import { Category, Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Link } from "react-router-dom"
// getProductsByCategoryId

export function Categories() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is Missing")
  const { state } = context
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

  // Queries
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
  const productWithCat = products?.map((product) => {
    const category = categories?.find((cat) => cat.id === product.categoryId)
    if (category) {
      return {
        ...product,
        categoryId: category.name
      }
    }
    return product
  })
  return (
    <>
      <NavBar />
      <p className="mt-2 mb-10 text-3xl font-bold tracking-tight sm:text-4xl"></p>
      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto w-full">
        <Carousel className="w-full">
          <CarouselContent className="w-full gap-2">
            {categories?.map((category) => (
              <CarouselItem className=" basis-1/4" key={category.name}>
                <div className="p-1">
                  <Link to={`/categories/${category.id}`}>
                    <Card key={category.id} className="w-[300px] h-[400px]">
                      <CardHeader>
                        <CardTitle>{category.description}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <img src={category.image} alt="" />
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  )
}
