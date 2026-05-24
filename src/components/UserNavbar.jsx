import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  ShoppingCart,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  Pill, // Changed to Pill for medical feel
  Stethoscope,
  ChevronDown
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import api from "../services/api";
import { cn } from "../lib/utils";

export default function UserNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const fetchAlertCount = async () => {
      try {
        const { data } = await api.get("/products/alerts");
        const count =
          (data.expiringSoon?.length ?? 0) +
          (data.expired?.length ?? 0) +
          (data.lowStock?.length ?? 0);
        setAlertCount(count);
      } catch (error) {
        setAlertCount(0);
      }
    };

    fetchAlertCount();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Updated categories to match your Medical Model
  const categories = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops'];

  const navLinkClasses = ({ isActive }) =>
    cn(
      "relative px-3 py-2 text-sm font-medium transition-all duration-200",
      isActive
        ? "text-emerald-600 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-emerald-600 after:rounded-full"
        : "text-slate-600 hover:text-emerald-600"
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-2"
          : "bg-white border-b border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Pharmacy Themed */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 group-hover:scale-105 transition-transform">
              <Pill className="text-white w-6 h-6" />
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Pharma<span className="text-emerald-600">Care</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            {token && (
              <>
                <NavLink to="/" className={navLinkClasses}>
                  Home
                </NavLink>

                <NavLink to="/expired-products" className={navLinkClasses}>
                  <span className="inline-flex items-center gap-2">
                    Stock Alerts
                    {alertCount > 0 && (
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-2 text-[10px] font-bold text-white">
                        {alertCount}
                      </span>
                    )}
                  </span>
                </NavLink>

                {/* Pharmacy Inventory Dropdown (Styled like Admin) */}
                <div className="relative group mx-2">
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                    Medicines
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                    <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Dosage Forms
                    </div>
                    {categories.map((cat) => (
                      <NavLink
                        key={cat}
                        to={`/user/products/${cat.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {cat}s
                      </NavLink>
                    ))}
                  </div>
                </div>

                <NavLink to="/customer/purchases" className={navLinkClasses}>
                  <span className="flex items-center gap-1.5">
                    <ShoppingBag size={18} />
                    My Orders
                  </span>
                </NavLink>
              </>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {token && (
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  cn(
                    "relative p-2.5 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                  )
                }
              >
                <ShoppingCart size={22} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                    {cartItems.length}
                  </span>
                )}
              </NavLink>
            )}

            {/* Auth Actions */}
            <div className="hidden md:flex items-center gap-2 ml-2">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <LogOut size={18} />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              ) : (
                <>
                  <NavLink to="/login" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="px-5 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-md transition-all">
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 ml-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-8 space-y-2">
          {token ? (
            <>
              <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-emerald-50" onClick={() => setIsMobileMenuOpen(false)}>
                <HomeIcon size={20} />
                <span className="font-medium">Home</span>
              </NavLink>

              <div className="py-2">
                <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Browse by Form
                </div>
                {categories.map((cat) => (
                  <NavLink
                    key={cat}
                    to={`/user/products/${cat.toLowerCase()}`}
                    className="flex items-center px-8 py-3 rounded-xl text-slate-600 hover:text-emerald-600 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat}s
                  </NavLink>
                ))}
              </div>

              <NavLink to="/expired-products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-emerald-50" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="font-medium">Stock Alerts</span>
                {alertCount > 0 && (
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-2 text-[10px] font-bold text-white">
                    {alertCount}
                  </span>
                )}
              </NavLink>

              <NavLink to="/customer/purchases" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-emerald-50" onClick={() => setIsMobileMenuOpen(false)}>
                <ShoppingBag size={20} />
                <span className="font-medium">My Orders</span>
              </NavLink>

              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 mt-4 rounded-xl text-rose-600 hover:bg-rose-50">
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-6 px-2">
              <NavLink to="/login" className="flex justify-center items-center px-4 py-3 rounded-xl border border-slate-200 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink>
              <NavLink to="/signup" className="flex justify-center items-center px-4 py-3 rounded-xl bg-emerald-600 text-white shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}