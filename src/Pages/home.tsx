import { Button } from "@/components/ui/button"

export function Home() {
  return (
    <>
      <section className="overflow-hidden  py-8 sm:py-16 flex items-center">
        <h1 className="mt-2 text-3xl font-bold align-center tracking-tight sm:text-4xl">
          <img
            className="align-center"
            src="https://i.ibb.co/WVVJYqV/Malhaja-Logo.png"
            alt="Malhaja Logo"
          />
        </h1>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <p className="mt-6 text-lg leading-8"> Simplicity is the key to luxury </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
                  <div className="relative pl-9">
                    <dd className="inline">
                      Catch every eye when you Step into the room, feeling so fly rocking Malhaja
                      colors are so vibrant pattern so bold makes you look like a fashionista that
                      can not be controlled.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="absolute left-1 top-1 h-5 w-5"
                      ></svg>
                      Simple, Luxury, Limited & Unique.
                    </dt>
                    <dd className="inline">
                      A lifestyle for the dreamers, the thinkers the go getters Malhaja will be
                      there with you to show your unique style.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="sp-embed-player h-auto" data-id="cZh3lHVLgPi">
              <script src="https://go.screenpal.com/player/appearance/cZh3lHVLgPi"></script>
              <iframe
                className="h-full  w-full border: none"
                allow="autoplay; muted; encrypted-media; border: none;"
                allowFullScreen
                src="https://go.screenpal.com/player/cZh3lHVLgPi?width=100%&height=100%&ff=1&title=0&controls=0&a=1&embed=1&autoplay=1"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
