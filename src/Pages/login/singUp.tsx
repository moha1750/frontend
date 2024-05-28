import api from "@/api"
import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

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
      const res = await api.post(`/users/signUp`, user)
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
      <div className="h-full ">
        <div className="mx-auto">
          <div className="flex justify-center px-6 py-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div className="w-full h-auto  hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
                <img
                  src="https://i.ibb.co/cTV0KVy/On-Person-Front.jpg"
                  alt=""
                  className="h-full w-full object-cover "
                />
              </div>
              <div className="w-full lg:w-7/12  p-5 rounded-lg lg:rounded-l-none">
                <h3 className="py-4 text-2xl text-center">Create an Account</h3>
                <form action="POST" onSubmit={handleSubmit}>
                  {/* <div className="w-full lg:grid h-full lg:grid-cols-2">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Create an Account!</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your Information below to create an account
                </p>
              </div>
              <div className="mb-4">
                <Label htmlFor="First Name">First Name</Label>
                <Input
                  type="string"
                  name="firstName"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="Last Name">Last Name</Label>
                <Input
                  type="string"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
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
              <div className="mb-4">
                <Label className="block mb-2 text-sm font-bold " htmlFor="email">
                  Email
                </Label>
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
        </div> */}
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <Label className="block mb-2 text-sm font-bold" htmlFor="firstName">
                        First Name
                      </Label>
                      <Input
                        type="string"
                        name="firstName"
                        placeholder="First Name"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:ml-2">
                      <Label className="block mb-2 text-sm font-bold" htmlFor="lastName">
                        Last Name
                      </Label>
                      <Input
                        type="string"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label className="block mb-2 text-sm font-bold " htmlFor="email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <Label className="block mb-2 text-sm font-bold " htmlFor="Phone">
                      Phone
                    </Label>
                    <Input
                      type="string"
                      name="phone"
                      placeholder="Phone"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <Label className="block mb-2 text-sm font-bold " htmlFor="password">
                        Password
                      </Label>
                      <Input
                        id="Password"
                        type="Password"
                        name="password"
                        placeholder="*********"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:ml-2">
                      <Label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="confirmPassword"
                      >
                        Confirm Password
                      </Label>
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
                  <div className="mb-6 text-center">
                    <Button
                      onClick={handleSubmit}
                      className="w-full px-4 py-2 font-bold  focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Register Account
                    </Button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <Link
                      className="inline-block text-sm focus:shadow-outline "
                      to="/Pages/login/forgotpass"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link className="inline-block text-sm focus:shadow-outline" to="/login">
                      Already have an account? Login!
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
