import App from "@/App"
import { Dashboard } from "@/Pages/Dashboard/dashboard"
import { Login } from "@/Pages/login/login"
import { Products } from "@/Pages/products"
import { ContactUs } from "@/Pages/contactUs"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { EditProducts } from "@/Pages/Dashboard/editProducts"
import { Analytics } from "@/Pages/Dashboard/analytics"
import { UsersDash } from "@/Pages/Dashboard/users"
import { ProductsDash } from "@/Pages/Dashboard/prouductsDash"
import { OrdersDash } from "@/Pages/Dashboard/ordersDash"
import { SingUp } from "@/Pages/login/singUp"
import { ForgotPassword } from "@/Pages/login/forgotpass"
import { ChangeEvent, createContext, useEffect, useState } from "react"
import { DecodedUser, Product } from "@/types"
import { ProductDetails } from "@/Pages/productDetails"
import { useQueryClient } from "@tanstack/react-query"
import { PrivateRouter } from "@/components/privateRouter"
import { AboutUs } from "@/Pages/aboutUs"
import { CategoryView } from "@/Pages/categoryview"

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
    path: "/categoryView",
    element: <CategoryView />
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
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    )
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/aboutUs",
    element: <AboutUs />
  },
  {
    path: "/dashboard/ordersdash",
    element: (
      <PrivateRouter>
        <OrdersDash />
      </PrivateRouter>
    )
  },
  {
    path: "/dashboard/productsdash",
    element: (
      <PrivateRouter>
        <ProductsDash />
      </PrivateRouter>
    )
  },
  {
    path: "/dashboard/editProducts",
    element: (
      <PrivateRouter>
        <EditProducts />
      </PrivateRouter>
    )
  },
  {
    path: "/ProductsDashboard",
    element: (
      <PrivateRouter>
        <ProductsDash />
      </PrivateRouter>
    )
  },
  {
    path: "/dashboard/analytics",
    element: (
      <PrivateRouter>
        <Analytics />
      </PrivateRouter>
    )
  },
  {
    path: "/dashboard/users",
    element: (
      <PrivateRouter>
        <UsersDash />
      </PrivateRouter>
    )
  }
])

type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleLogoutUser: () => void
  handleStoreUser: (user: DecodedUser) => void
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}
type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
  search: string
}
// store value of search keyword
// implement handleChange function
// in Search component, simply using useConext to get value of keyword, handleChange
export const GlobalContext = createContext<GlobalContextType | null>(null)
export function Router() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null,
    search: ""
  })
  console.log(state.cart)
  const queryClient = useQueryClient()

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
    const cart = state.cart
    const index = state.cart.findIndex((item) => item.id === id)
    cart.splice(index, 1)
    setState({
      ...state,
      cart: cart
    })
    // this is the way to do  it with filter
    // const filteredCart = state.cart.filter((item) => item.id !== id)
    // setState({
    //   ...state,
    //   cart: filteredCart
    // })
  }
  const handleAddToCart = (product: Product) => {
    // to not allow any duplicating
    //  const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    // if (isDuplicated) return
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
  const handleLogoutUser = () => {
    setState({
      ...state,
      user: null
    })
  }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setState({
      ...state,
      search: e.target.value
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        state,
        handleAddToCart,
        handleDeleteFromCart,
        handleStoreUser,
        handleSearch,
        handleLogoutUser
      }}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  )
}
