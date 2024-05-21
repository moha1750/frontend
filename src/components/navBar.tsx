import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { Cart } from "@/Pages/Cart"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GlobalContext } from "@/routes/Router"
import { ChangeEvent, useContext } from "react"
import { ModeToggle } from "./modeToggle"
import { SearchInput } from "./search"

export function NavBar() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is Missing")
  const { state } = context

  return (
    <nav className="flex justify-between mb-4">
      <div>
        <img
          src="https://images.photowall.com/products/60733/tiger-4.jpg?h=699&q=85"
          alt=""
          width="100"
          height="25"
          className=" object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <NavigationMenu>
        <NavigationMenuList className="gap-5">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {state.user?.role === "Admin" && (
            <NavigationMenuItem>
              <Link to="/dashboard">
                <NavigationMenuLink>Dashboard</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <Link to="/Products">
              <NavigationMenuLink>Products</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink>AboutUs</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/contactus">
              <NavigationMenuLink>ContactUs</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/login">
              <NavigationMenuLink>Login</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {!state.user && (
            <NavigationMenuItem>
              <Link to="/singUp">
                <NavigationMenuLink>SignUp</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <form className="ml-auto flex-1 sm:flex-initial">
        <div className="relative flex items-center gap-2">
          {/* <Search className="absolute left-2.5 top-6 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          /> */}
          <SearchInput />
          <ModeToggle />
          <Cart />
        </div>
      </form>
    </nav>
  )
}
