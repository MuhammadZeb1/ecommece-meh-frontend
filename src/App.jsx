import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CreateProduct from "./pages/CreateProduct"





function App() {
  

  return (
   <>
     <Routes>
      {/* Your route components go here */}
      <Route path="/" element={<Home/>} />
      <Route path = "/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/createProduct" element={<CreateProduct />} />
     </Routes>
   </>
  )
}

export default App
