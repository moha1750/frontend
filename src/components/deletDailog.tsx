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
import { Product } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"

export function DeleteDialog({ product }: { product: Product }) {
  const queryClient = useQueryClient()
  const [deleteProduct, setDeleteProduct] = useState(product)

  const deleteDialog = async (id: string) => {
    try {
      const res = await api.delete(`/products/${id}`)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setDeleteProduct({
      ...deleteProduct,
      name: value
    })
  }
  const handleDelete = async (id: string) => {
    await deleteDialog(id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
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
            <p>Are you sure you want to Delete {product.name}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="destructive" type="submit" onClick={() => handleDelete(product.id)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
