import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateProduct from "./pages/CreateProduct";
import UpdateProducts from "./pages/UpdateProducts";
import CategoryPage from "./pages/CategoryPage";
import UserProductList from "./pages/UserProductList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminPurchases from "./pages/AdminPurchases";
import Purchases from "./pages/Purchases";
import AdminDashboard from "./pages/AdminDashboard";
import ExpiredProducts from "./pages/ExpiredProducts";

// Components
import UserNavbar from "./components/UserNavbar";
import AdminNavbar from "./components/AdminNavbar";
import Navbar from "./components/Navbar"; // Default/Guest Navbar

function App() {
  const { token, user } = useSelector((state) => state.auth);

  // Helper function to render the correct Navbar
  const renderNavbar = () => {
    if (!token) return <Navbar />; // Guest Navbar
    if (user?.role === "admin") return <AdminNavbar />; // Admin Navbar
    return <UserNavbar />; // Customer Navbar
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* {renderNavbar()} */}

      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Product Management (Admin Only) */}
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProducts />} />
        
        {/* Categories */}
        <Route path="/dashboard/category/:category" element={<CategoryPage />} />
        <Route path="/user/products/:category" element={<UserProductList />} />
        
        {/* Cart & Checkout */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Purchase History */}
        <Route path="/customer/purchases" element={<Purchases />} />
        <Route path="/admin/purchases" element={<AdminPurchases />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/expired-products" element={<ExpiredProducts />} />
      </Routes>
    </>
  );
}

export default App;