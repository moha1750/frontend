import "./App.css"
import { ThemeProvider } from "@/components/themeProvider"

import { NavBar } from "./components/navBar"
import { Home } from "./Pages/home"

import { ProductView } from "./Pages/productsview"
import { FooterSection } from "./Pages/footer"

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavBar />
        <Home />
        <ProductView />
        <FooterSection />
      </ThemeProvider>
    </>
  )
}

export default App
