import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ShoppingCart } from "lucide-react"
import { useContext } from "react"
import { GlobalContext } from "@/routes/Router"
import { Products } from "./products"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("")
  const { state, handleDeleteFromCart, handleAddToCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {})
  const total = state.cart.reduce((acc, curr) => {
    return acc + curr.price
  }, 0)
  const keys = Object.keys(groups)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="flex flex-col h-16 relative hover:!bg-background"
          variant="ghost"
          onClick={() => state}
        >
          {state.cart.length > 0 ? (
            <Badge className="aspect-square flex justify-center  items-center p-1  overflow-hidden absolute right-[10%] top-[10%]">
              {state.cart.length}
            </Badge>
          ) : (
            <></>
          )}
          <ShoppingCart className="size-5 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-300">
        <div>
          {Object.keys(groups).length > 0 ? (
            Object.keys(groups).map((key) => {
              const Products = groups[key]
              const Product = Products[0]
              return (
                <div className="mb-4 flex items-center gap-4" key={Product.id}>
                  <img className="w-10 h-10 object-contain" src={Product.image} alt="" />
                  <h3>{Product.name}</h3>
                  <Button variant="outline" onClick={() => handleDeleteFromCart(Product.id)}>
                    -
                  </Button>
                  <span className="font-bold">{Product.length}</span>
                  <Button variant="outline" onClick={() => handleAddToCart(Product)}>
                    +
                  </Button>
                </div>
              )
            })
          ) : (
            <h3>Cart is Empty </h3>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
