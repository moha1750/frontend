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

export function AddAddress({ address }: { address: Address }) {
  const queryClient = useQueryClient()
  const [updatedAddress, setUpdatedAddress] = useState(address)

  const addAddress = async (updatedAddress: Address) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post(`/addresses/${updatedAddress.id}`, updatedAddress, {
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
            <Label htmlFor="name" className="text-right">
              City{" "}
            </Label>
            <span className="col-span-3">{address.city}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              New Value
            </Label>
            <Input
              onChange={handleChange}
              placeholder="type your update here"
              className="col-span-3 text-left"
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Zip{" "}
            </Label>
            <span className="col-span-3">{address.zip}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              New Value
            </Label>
            <Input
              onChange={handleChange}
              placeholder="type your update here"
              className="col-span-3 text-left"
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Address
            </Label>
            <span className="col-span-3">{address.addressLine}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              New Value
            </Label>
            <Input
              onChange={handleChange}
              placeholder="type your update here"
              className="col-span-3 text-left"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleUpdate}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
