import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
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
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // logout پر login page پر redirect
  };

  const categories = ["Men", "Women", "Kids"]; // direct links in navbar

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

          {token ? (
            <>
              {/* Direct categories visible */}
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
              {/* Login + Signup for logged-out user */}
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
