import { NavBar } from "@/components/navBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-dropdown-menu"

export function ContactUs() {
  return (
    <>
      <NavBar />

      <div className="max-w-screen-lg mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 border">
          <div className=" md:col-span-4 p-10">
            <p className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
              <img
                className="logo"
                src="https://i.ibb.co/WVVJYqV/Malhaja-Logo.png"
                alt="Malhaja Logo"
              />
            </p>
            <p className="mt-4 leading-7 ">
              Simple, Luxury, Limited & Unique. A lifestyle for the dreamers, the thinkers the go
              getters. Malhaja will be there with you to show your unique personality.
            </p>

            <div className="flex items-center mt-5">
              <svg className="h-6 mr-2" fill="currentColor" viewBox="0 0 489.536 489.536"></svg>
              <span className="mt-4 text-sm items-center">Saudi Arabia.</span>
            </div>
            <div className="flex items-center mt-5">
              <svg
                className="h-6 mr-2 "
                fill="currentColor"
                x="0px"
                y="0px"
                viewBox="0 0 60.002 60.002"
              ></svg>
              <span className="text-sm items-center">+966 505 666 855</span>
            </div>
          </div>
          <form className="md:col-span-8 p-10">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                  First Name
                </Label>
                <Input
                  className="appearance-none block w-full   rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
                  id="First Name"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <Label className="block uppercase tracking-wide  font-bold mb-2">Last Name</Label>
                <Input
                  className="appearance-none block w-full  rounded py-3 px-4 leading-tight focus:outline-none "
                  id="Last Name"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <Label className="block uppercase tracking-wide  font-bold mb-2">
                  Email Address
                </Label>
                <Input
                  className="appearance-none block w-full rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
                  id="grid-email"
                  type="email"
                  placeholder="m@example.com"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <Label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                  Your Message
                </Label>
                <Textarea className="appearance-none block w-full  rounded py-3 px-4 mb-3 leading-tight focus:outline-none "></Textarea>
              </div>
              <div className="flex justify-between w-full px-3">
                <Button
                  className="shadow focus:shadow-outline focus:outline-none  font-bold py-2 px-6 rounded"
                  type="submit"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
