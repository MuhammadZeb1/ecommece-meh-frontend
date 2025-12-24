import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import UpdateProducts from "./pages/UpdateProducts";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryPage from "./pages/CategoryPage";


function App() {
  return (
    <>
      {/* Toasts */}
      <ToastContainer position="top-left" autoClose={3000} />
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />

      {/* ✅ Sidebar Context */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProducts />} />
          <Route
            path="/dashboard/category/:category"
            element={<CategoryPage />}
          />
        </Routes>
      
    </>
  );
}

export default App;
