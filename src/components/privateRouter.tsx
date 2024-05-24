import { ReactElement } from "react"
import { Navigate } from "react-router-dom"
import jwt from "jwt-decode"
import { log } from "console"
import { userExperience } from "@/lib/utils"

export function PrivateRouter({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("token") || ""

  if (!token) return <Navigate to="/" />

  const decodedToken = jwt(token)
  const decodedUser = userExperience(decodedToken)
  return decodedUser.role === 0 ? <Navigate to="/" /> : children
}
