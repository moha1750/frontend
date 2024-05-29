import api from "@/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Address } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import { Navigate } from "react-router-dom"

export function AddAddress() {
  const queryClient = useQueryClient()
  const [updatedAddress, setUpdatedAddress] = useState({
    id: "",
    city: "",
    zip: "",
    addressLine: "",
    userId: ""
  })
  const user = localStorage.getItem("user")

  if (!user) return <Navigate to="/" />
  const addAddress = async (updatedAddress: Address) => {
    try {
      const token = localStorage.getItem("token")

      const addressWithUser = {
        ...updatedAddress,
        userId: JSON.parse(user).nameidentifier
      }
      const res = await api.post(`/addresses/${updatedAddress.id}`, addressWithUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedAddress({
      ...updatedAddress,
      [name]: value
    })
  }
  const handleUpdate = async () => {
    await addAddress(updatedAddress)
    queryClient.invalidateQueries({ queryKey: ["addresses"] })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
          <DialogDescription>
            Add your Address here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              New Value
            </Label>
            <Input
              onChange={handleChange}
              placeholder="type your update here"
              className="col-span-3 text-left"
              name="city"
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              New Value
            </Label>
            <Input
              onChange={handleChange}
              placeholder="type your update here"
              className="col-span-3 text-left"
              name="zip"
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              New Value
            </Label>
            <Input
              onChange={handleChange}
              placeholder="type your update here"
              className="col-span-3 text-left"
              name="addressLine"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
