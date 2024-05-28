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
import { Address, Order, User } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavBar } from "@/components/navBar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { EditUser } from "@/components/editUser"

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
  const getAddress = async () => {
    try {
      const res = await api.post("/addresses")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: address, error: addressError } = useQuery<Address[]>({
    queryKey: ["address"],
    queryFn: getAddress
  })
  const getAddressFromUser = address?.filter(
    (address) => address.userId == state.user?.nameidentifier
  )
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
            <CardTitle>Welcome @{state.user?.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sm:table-cell  text-center">FirstName</TableHead>
                  <TableHead className="sm:table-cell  text-center">LastName</TableHead>
                  <TableHead className="sm:table-cell  text-center">Email</TableHead>
                  <TableHead className="sm:table-cell  text-center">Phone</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell className="sm:table-cell">{user?.firstName}</TableCell>
                  <TableCell className="md:table-cell">{user?.lastName}</TableCell>
                  <TableCell className="md:table-cell">{user?.email}</TableCell>
                  <TableCell className="md:table-cell">{user?.phone}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button>
              {/* <EditUser User={user} /> */}
              Edit Profile
            </Button>
          </CardFooter>
        </Card>
        <div className="grid gap-6">
          <Card className="w-[300px]  !h-full">
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sm:table-cell  text-center">City</TableHead>
                    <TableHead className="sm:table-cell  text-center">Zip</TableHead>
                    <TableHead className="sm:table-cell  text-center">Address</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell className="sm:table-cell">{user?.firstName}</TableCell>
                    <TableCell className="md:table-cell">{user?.lastName}</TableCell>
                    <TableCell className="md:table-cell">{user?.email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button>
                {/* <EditUser User={user} /> */}
                Edit Address
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
