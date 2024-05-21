import App from "@/App"
import { Dashboard } from "@/Pages/Dashboard/dashboard"
import { Login } from "@/Pages/login/login"
import { Products } from "@/Pages/Products"
import { ContactUs } from "@/Pages/contactUs"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { EditProducts } from "@/Pages/Dashboard/editProducts"
import { Analytics } from "@/Pages/Dashboard/analytics"
import { UsersDash } from "@/Pages/Dashboard/users"
import { ProductsDash } from "@/Pages/Dashboard/prouductsDash"
import { OrdersDash } from "@/Pages/Dashboard/ordersDash"
import { SingUp } from "@/Pages/login/singUp"
import { ForgotPassword } from "@/Pages/login/forgotpass"
import { createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "@/types"
import { ProductDetails } from "@/Pages/productDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  },
  {
    path: "/contactus",
    element: <ContactUs />
  },
  {
    path: "/singUp",
    element: <SingUp />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/Pages/login/forgotpass",
    element: <ForgotPassword />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/dashboard/ordersdash",
    element: <OrdersDash />
  },
  {
    path: "/dashboard/productsdash",
    element: <ProductsDash />
  },
  {
    path: "/dashboard/editProducts",
    element: <EditProducts />
  },
  {
    path: "/ProductsDashboard",
    element: <ProductsDash />
  },
  {
    path: "/dashboard/analytics",
    element: <Analytics />
  },
  {
    path: "/dashboard/users",
    element: <UsersDash />
  }
])

type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
}
type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}
export const GlobalContext = createContext<GlobalContextType | null>(null)
export function Router() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])
  const handleDeleteFromCart = (id: string) => {
    const filteredCart = state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: filteredCart
    })
  }
  const handleAddToCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }
  return (
    <GlobalContext.Provider
      value={{ state, handleAddToCart, handleDeleteFromCart, handleStoreUser }}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  )
}
