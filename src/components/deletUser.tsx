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
import { User } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

export function DeleteUsers({ user }: { user: User }) {
  const queryClient = useQueryClient()
  const [deleteUser, setDeleteUser] = useState(user)

  const deleteUsers = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.delete(`/users/${id}`, {
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
    setDeleteUser({
      ...deleteUser,
      [name]: value
    })
  }
  const handleDelete = async (id: string) => {
    await deleteUsers(id)
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            By Clicking Delete the value will be deleted forever.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p>Are you sure you want to Delete {user.email}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="destructive" type="submit" onClick={() => handleDelete(user.id)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
