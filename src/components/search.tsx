import { GlobalContext } from "@/routes/Router"

import { Input } from "./ui/input"
import { useContext } from "react"

export function SearchInput() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("GLobal context is missing")
  const { state, handleSearch } = context

  return (
    <>
      <Input
        onChange={handleSearch}
        type="search"
        name="search"
        value={state.search}
        placeholder="Search"
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
      />
    </>
  )
}
