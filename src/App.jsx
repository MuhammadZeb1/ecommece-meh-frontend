import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import CreateProduct from "./pages/CreateProduct";
import UpdateProducts from "./pages/UpdateProducts";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryPage from "./pages/CategoryPage";
import KidProduct from "./pages/KidProduct";
import UserProductList from "./pages/UserProductList";
import { User } from "lucide-react";
import UserNavbar from "./components/UserNavbar";
import AdminNavbar from "./components/AdminNavbar";
import Cart from "./pages/Cart";

//  const token = localStorage.getItem(token)

function App() {
  return (
    <>
      {/* Toasts */}
      <ToastContainer position="top-left" autoClose={3000} />
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />
      {/* <UserNavbar /> */}

      {/* ✅ Sidebar Context */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProducts />} />
          <Route
            path="/dashboard/category/:category"
            element={<CategoryPage />}
          />
          

          <Route path="/cart" element={<Cart />} />
          {/* Add other routes as needed */}
          <Route path="/kidProduct" element={<KidProduct />} />
          <Route path="/user/products/:category" element={<UserProductList />} />
        </Routes>
      
    </>
  );
}

export default App;
