import "./App.css"
import { ThemeProvider } from "@/components/themeProvider"

import { NavBar } from "./components/navBar"
import { Products } from "./Pages/Products"

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Products />
      </ThemeProvider>
    </>
  )
}

export default App
