import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "../lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

export default function UserNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.auth);


  const cartItems = useSelector((state) => state.cart.items); // get cart items

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const categories = ["Men", "Women", "Kids"];

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      {/* Logo */}
      <div className="flex-1">
        <span className="text-2xl font-bold text-blue-600">MyProject</span>
      </div>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList className="gap-2 flex items-center">
          {/* Home always visible */}
          <NavigationMenuItem>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  navigationMenuTriggerStyle(),
                  "flex gap-2 items-center",
                  isActive && "bg-accent text-accent-foreground font-bold"
                )
              }
            >
              <FaHome /> Home
            </NavLink>
          </NavigationMenuItem>

          {/* Cart link */}
          <NavigationMenuItem>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(
                  navigationMenuTriggerStyle(),
                  "flex gap-2 items-center",
                  isActive && "bg-accent text-accent-foreground font-bold"
                )
              }
            >
              <FaShoppingCart /> Cart
              {cartItems.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          </NavigationMenuItem>

          {token ? (
            <>
              {/* Direct categories */}
              {categories.map((cat) => (
                <NavigationMenuItem key={cat}>
                  <NavLink
                    to={`/user/products/${cat.toLowerCase()}`}
                    className={({ isActive }) =>
                      cn(
                        navigationMenuTriggerStyle(),
                        "flex gap-2 items-center",
                        isActive && "bg-accent text-accent-foreground font-bold"
                      )
                    }
                  >
                    {cat}
                  </NavLink>
                </NavigationMenuItem>
              ))}

              {/* Logout button */}
              <NavigationMenuItem>
                <button
                  onClick={handleLogout}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex gap-2 items-center hover:bg-red-100 text-red-600"
                  )}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              {/* Login + Signup */}
              <NavigationMenuItem>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    cn(
                      navigationMenuTriggerStyle(),
                      "flex gap-2 items-center",
                      isActive && "bg-accent text-accent-foreground font-bold"
                    )
                  }
                >
                  <FaUser /> Signup
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    cn(
                      navigationMenuTriggerStyle(),
                      "flex gap-2 items-center",
                      isActive && "bg-accent text-accent-foreground font-bold"
                    )
                  }
                >
                  <FaSignInAlt /> Login
                </NavLink>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
