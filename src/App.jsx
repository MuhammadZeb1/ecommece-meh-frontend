import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CreateProduct from "./pages/CreateProduct"
import UpdateProducts from "./pages/UpdateProducts"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenProducts from "./pages/MenProducts"
import WomenProducts from "./pages/WomenProducts"
import KidProduct from "./pages/KidProduct"
import CategoryPage from "./pages/CategoryPage"





function App() {
  

  return (
   <>
   <ToastContainer
  position="top-left"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnHover
/>
    {/* your routes */}
      <ToastContainer position="top-right" autoClose={3000} />
   <Navbar/>
     <Routes>
      {/* Your route components go here */}
      <Route path="/" element={<Home/>} />
      <Route path = "/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/createProduct" element={<CreateProduct />} />
      <Route path="/updateProduct/:id" element={<UpdateProducts />} />
      {/* <Route path="/menProducts" element={<MenProducts />} />
      <Route path="/womenProducts" element={<WomenProducts />} />
      <Route path="/kidProduct" element={<KidProduct />} /> */}
      <Route path="/dashboard/category/:category" element={<CategoryPage />} />

     </Routes>
   </>
  )
}

export default App
