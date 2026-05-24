import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  LogOut,
  Home as HomeIcon,
  BarChart3,
  History,
  ChevronDown,
  Menu,
  X,
  Package,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { cn } from "../lib/utils";

function AdminNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const categories = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops'];

  const navItemClasses = ({ isActive }) =>
    cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      isActive
        ? "bg-indigo-50 text-indigo-600 shadow-sm"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Package className="text-white w-5 h-5" />
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              My<span className="text-indigo-600">Project</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {token ? (
              <>
                <NavLink to="/" className={navItemClasses}>
                  <HomeIcon size={18} />
                  <span>Home</span>
                </NavLink>

                <NavLink
                  to="/admin/dashboard"
                  className={navItemClasses}
                >
                  <BarChart3 size={18} />
                  <span>Analytics</span>
                </NavLink>

                <NavLink
                  to="/admin/purchases"
                  className={navItemClasses}
                >
                  <History size={18} />
                  <span>Purchases</span>
                </NavLink>

                {/* Inventory Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all">
                    <LayoutDashboard size={18} />

                    <span>Inventory</span>

                    <ChevronDown
                      size={14}
                      className="group-hover:rotate-180 transition-transform duration-200"
                    />
                  </button>

                  <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:translate-y-0 translate-y-2 py-2 z-50">
                    <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Categories
                    </div>

                    {categories.map((cat) => (
                      <NavLink
                        key={cat}
                        to={`/dashboard/category/${cat.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        {cat} Products
                      </NavLink>
                    ))}
                  </div>
                </div>

                <NavLink to="/createProduct" className={navItemClasses}>
                  <PlusCircle size={18} />
                  <span>Create</span>
                </NavLink>

                <div className="h-6 w-px bg-slate-200 mx-2"></div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 ml-4">
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all active:scale-95"
                >
                  Get Started
                </NavLink>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {token ? (
            <>
              <NavLink
                to="/"
                className={navItemClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HomeIcon size={18} />
                Home
              </NavLink>

              <NavLink
                to="/admin/dashboard"
                className={navItemClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BarChart3 size={18} />
                Analytics
              </NavLink>

              <NavLink
                to="/admin/purchases"
                className={navItemClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <History size={18} />
                Purchases
              </NavLink>

              <NavLink
                to="/createProduct"
                className={navItemClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PlusCircle size={18} />
                Create Product
              </NavLink>

              <div className="pt-4 pb-2">
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase">
                  Inventory
                </div>

                {categories.map((cat) => (
                  <NavLink
                    key={cat}
                    to={`/dashboard/category/${cat.toLowerCase()}`}
                    className="flex items-center gap-2 px-8 py-2 text-sm text-slate-600 hover:text-indigo-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat} Products
                  </NavLink>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 mt-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-4 px-2">
              <NavLink
                to="/login"
                className="flex justify-center items-center px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="flex justify-center items-center px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Signup
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
