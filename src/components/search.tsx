import api from "@/api"
import { GlobalContext } from "@/routes/Router"
import { Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useContext, useState } from "react"
import { Input } from "./ui/input"

export function SearchInput() {
  const [searchBy, setSearchBy] = useState("")

  const queryClient = useQueryClient()

  const context = useContext(GlobalContext)
  if (!context) throw Error("GLobal context is missing")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }, 1000)
  }

  console.log("search keyword in search component ", searchBy)

  return (
    <>
      <Input
        onChange={handleChange}
        type="search"
        name="searchBy"
        value={searchBy}
        placeholder="Search"
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
      />
    </>
  )
}
