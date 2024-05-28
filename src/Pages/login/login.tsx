import api from "@/api"
import { GoogleLogin } from "react-google-login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import jwt from "jwt-decode"
import { userExperience } from "@/lib/utils"
import { GlobalContext } from "@/routes/Router"

export function Login() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is Missing")
  const { handleStoreUser } = context
  // const clientId = "73577810799-jn5dn2d51cmir5pq8ockgu0ln7de2f33.apps.googleusercontent.com"

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const handleSignIn = async () => {
    try {
      const res = await api.post(`/users/signIn`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("User already exists "))
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const token = await handleSignIn()
    console.log(token)
    if (token) {
      localStorage.setItem("token", token)
      const decodedToken = jwt(token)
      const user = userExperience(decodedToken)
      localStorage.setItem("user", JSON.stringify(user))
      handleStoreUser(user)
      navigate("/")
    }
  }

  return (
    <div className="w-full lg:grid h-full lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <form action="POST" onSubmit={handleSubmit}>
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">Sign in your account</p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/Pages/login/forgotPass"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* <div id="signIn">
                <GoogleLogin clientId={clientId} />
              </div> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/singUp" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://i.ibb.co/pRwVtj1/Person-Left.png"
          alt=""
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
