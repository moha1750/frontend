import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export function SingUp() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: null
  })
  const handleSignUp = async () => {
    try {
      const res = await api.post(`/users/signup`, user)
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
    const response = await handleSignUp()
    if (response) {
      navigate("/login")
    }
  }
  return (
    <div>
      <NavBar />
      <form action="POST" onSubmit={handleSubmit}>
        <div className="w-full lg:grid h-full lg:grid-cols-2">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">SingUp</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your Information below to create an account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="First Name">First Name</Label>
                <Input
                  type="string"
                  name="firstName"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Last Name">Last Name</Label>
                <Input
                  type="string"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Phone">Phone</Label>
                <div className="flex items-center">
                  <Input
                    type="string"
                    name="phone"
                    placeholder="Phone"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <Label htmlFor="email">Email</Label>
                <div className="grid gap-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center">
                  <Input
                    id="Password"
                    type="Password"
                    name="password"
                    placeholder="Password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Confirm Password</Label>
                  <div className="flex items-center">
                    <Input
                      id="Password"
                      type="Password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Button onClick={handleSubmit} type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
