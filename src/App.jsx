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
import UserNavbar from "./components/UserNavbar";
import AdminNavbar from "./components/AdminNavbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// ✅ Removed duplicate imports here
import AdminPurchases from "./pages/AdminPurchases";
import Purchases from "./pages/Purchases";

function App() {
  return (
    <>
      {/* ✅ Keep only one ToastContainer to avoid overlapping UI */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Product Management */}
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProducts />} />
        
        {/* Categories & Lists */}
        <Route path="/dashboard/category/:category" element={<CategoryPage />} />
        <Route path="/kidProduct" element={<KidProduct />} />
        <Route path="/user/products/:category" element={<UserProductList />} />
        
        {/* Cart & Checkout */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Purchase History */}
        <Route path="/admin/purchases" element={<AdminPurchases />} />
        <Route path="/customer/purchases" element={<Purchases />} />
      </Routes>
    </>
  );
}

export default App;