import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  HomeIcon,
  Menu,
  Package2,
  Search,
  Users
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Link } from "react-router-dom"
import { GlobalContext } from "@/routes/Router"
import { useContext } from "react"
import api from "@/api"
import { User } from "@/types"
import { useQuery } from "@tanstack/react-query"

export function Dashboard() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is Missing")
  const { handleLogoutUser, state } = context

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get(`/users?sort=0&search=${state.search}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: users, error } = useQuery<User[]>({
    queryKey: ["products"],
    queryFn: getUsers
  })
  const handleLogout = () => {
    if (typeof window !== undefined) {
      window.location.reload()
    }
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    handleLogoutUser()
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <HomeIcon className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
          <Link to="/dashboard" className="text-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link
            to="/dashboard/users"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Users
          </Link>
          <Link
            to="/dashboard/categoriesDash"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Categories
          </Link>
          <Link
            to="/dashboard/productsDash"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link to="/dashboard/stockDash" className="text-muted-foreground hover:text-foreground">
            Stocks
          </Link>
          <Link to="/dashboard/ordersDash" className="text-muted-foreground hover:text-foreground">
            Orders
          </Link>

          <Link
            to="/dashboard/analytics"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link to="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link to="/dashboard/users" className="text-muted-foreground hover:text-foreground">
                Users
              </Link>
              <Link
                to="/dashboard/categoriesDash"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Categories</span>
              </Link>
              <Link
                to="/dashboard/productsDash"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                to="/dashboard/stockDash"
                className="text-muted-foreground hover:text-foreground"
              >
                Stocks
              </Link>
              <Link
                to="/dashboard/ordersDash"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                to="/dashboard/analytics"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to="/profile" className="">
                <DropdownMenuLabel>Profile</DropdownMenuLabel>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+Total Users</div>
              <p className="text-xs text-muted-foreground">+{users?.length}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
