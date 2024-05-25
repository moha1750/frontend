import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { Cart } from "@/Pages/Cart"
import { LogOutIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GlobalContext } from "@/routes/Router"
import { useContext } from "react"
import { ModeToggle } from "./modeToggle"
import { SearchInput } from "./search"
import { Button } from "./ui/button"
import { ThemeProvider } from "./themeProvider"

export function NavBar() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is Missing")
  const { state, handleLogoutUser } = context

  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    handleLogoutUser()
  }
  return (
    <nav className="flex justify-between mb-4">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div>
          <img
            src="https://i.ibb.co/WVVJYqV/Malhaja-Logo.png"
            alt="Malhaja-Logo"
            width="100"
            height="25"
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
              <Link to="/aboutUs">
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
            <SearchInput />
            <ModeToggle />
            <Cart />
            {state.user && (
              <Button
                onClick={handleLogout}
                className="flex flex-col h-16 relative hover:!bg-background"
                variant="ghost"
              >
                <LogOutIcon />
              </Button>
            )}
          </div>
        </form>
      </ThemeProvider>
    </nav>
  )
}
