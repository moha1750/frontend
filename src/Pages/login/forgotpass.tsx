import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"

export function ForgotPassword() {
  return (
    <form>
      <NavBar />
      <div className="w-full lg:grid h-full lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter The Email address associated with your account & we will send you a link to
                reset your password
              </p>
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="m@example.com" required />

              <Button type="submit" className="w-full">
                Continue
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/singUp" className="underline">
                Sign up
              </Link>
            </div>
          </div>
          <div className="w-full h-auto  hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"></div>
        </div>
        <img
          src="https://i.ibb.co/k3x07ym/Front.png"
          alt=""
          className="h-full w-full object-cover "
        />
      </div>
    </form>
  )
}
