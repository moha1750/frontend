import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ShoppingCart } from "lucide-react"
import { useContext } from "react"
import { GlobalContext } from "@/routes/Router"

export function Cart() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("")
  const { state, handleDeleteFromCart } = context
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
      <PopoverContent className="w-80">
        <div>
          {state.cart.length > 0 ? (
            state.cart.map((Product) => {
              return (
                <div className="mb-4 flex items-center gap-4" key={Product.id}>
                  <img className="w-10 h-10 object-contain" src={Product.image} alt="" />
                  <h3>{Product.name}</h3>
                  <Button variant="destructive" onClick={() => handleDeleteFromCart(Product.id)}>
                    x
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
