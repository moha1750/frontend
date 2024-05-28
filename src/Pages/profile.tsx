import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useContext } from "react"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { GlobalContext } from "@/routes/Router"
import { Order, User } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavBar } from "@/components/navBar"

export function Profile() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("COntext is missing")
  const { state } = context
  const token = localStorage.getItem("token")
  const getUser = async () => {
    try {
      const res = await api.get(`/users/email/${state.user?.emailaddress}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: user, error } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser
  })
  const findCustomer = state.user
  console.log(findCustomer)
  const getOrders = async () => {
    try {
      const res = await api.get("/order")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: orders, error: orderError } = useQuery<Order[]>({
    queryKey: ["order"],
    queryFn: getOrders
  })
  const getOrderFromUser = orders?.filter((order) => order.userId == state.user?.nameidentifier)
  return (
    <>
      <NavBar />

      <div className="flex flex-col md:grid md:grid-cols-[280px_1fr] gap-6 p-4 md:p-6">
        <div className="  rounded-lg p-6 border">
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage alt="Customer Avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback>{state.user?.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 text-contain">
              <h3 className="text-xl ">@{state.user?.name}</h3>
              <div>
                <h4>{user?.email}</h4>
              </div>
            </div>
          </div>
        </div>
        {/* ask for help here to fix the page 
        also  how to show the profile link for users only */}

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col py-3 justify-between items-center">
                <Label className="mb-1  md:text-lg" htmlFor="name">
                  First Name
                </Label>
                <p className="text-lg font-semibold">{user?.firstName}</p>

                <Label className="mb-1  md:text-lg" htmlFor="name">
                  Last Name
                </Label>
                <p className="text-lg font-semibold">{user?.lastName}</p>

                <Label className="mb-1  md:text-lg" htmlFor="phone">
                  Email
                  <p>{user?.email}</p>
                </Label>

                <Label htmlFor="phone">Phone</Label>
                <p className="text-lg font-semibold">{user?.phone}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-left">
                  {getOrderFromUser?.map((order) => {
                    return (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Link className="font-medium" to="#">
                            #
                          </Link>
                        </TableCell>
                        {/* <TableCell>{order.date}</TableCell> */}
                        <TableCell>$99.99</TableCell>
                        <TableCell>
                          <Badge variant="default">{order.status}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
