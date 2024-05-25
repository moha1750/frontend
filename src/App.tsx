import "./App.css"

import { NavBar } from "./components/navBar"
import { Home } from "./Pages/home"

import { ProductView } from "./Pages/productsview"
import { FooterSection } from "./Pages/footer"
import { CategoryView } from "./Pages/categoryview"

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <ProductView />
      <CategoryView />
      <FooterSection />
    </>
  )
}

export default App
