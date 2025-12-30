import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaSignInAlt, FaTachometerAlt, FaPlus } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"; // Make sure path is correct
import { cn } from "../lib/utils"; // Utility for conditional class names

function Navbar() {
  // Detect login state
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);
  const role = localStorage.getItem("role");

  console.log("ROLE:", role);

  const categories = ["Men", "Women", "Kids"];

  // Logout handler
  const handleLogout = () => {
    localStorage.clear(); // Remove token and role
    window.location.reload(); // Force re-render Navbar
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      {/* Left side: Logo */}
      <div className="flex-1">
        <span className="text-2xl font-bold text-blue-600">MyProject</span>
      </div>

      {/* Right side: Navigation */}
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          {/* Always visible: Home */}
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

          {/* Show Signup + Login only if NOT logged in */}
          {!isLoggedIn && (
            <>
              <NavigationMenuItem>
                <NavLink
                  to="/signup"
                  className={cn(navigationMenuTriggerStyle(), "flex gap-2 items-center")}
                >
                  <FaUser /> Signup
                </NavLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavLink
                  to="/login"
                  className={cn(navigationMenuTriggerStyle(), "flex gap-2 items-center")}
                >
                  <FaSignInAlt /> Login
                </NavLink>
              </NavigationMenuItem>
            </>
          )}

          {/* Show Logout + Dashboard only if logged in */}
          {isLoggedIn && (
            <>
              {/* Logout Button */}
              <NavigationMenuItem>
                <button
                  onClick={handleLogout}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex gap-2 items-center text-red-600"
                  )}
                >
                  Logout
                </button>
              </NavigationMenuItem>

              {/* Dashboard Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex gap-2 items-center">
                  <FaTachometerAlt /> Dashboard
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4 md:w-[250px] lg:w-[300px]">
                    <li className="mb-2 font-medium text-sm text-muted-foreground px-2">
                      Browse Categories
                    </li>
                    {categories.map((cat) => (
                      <li key={cat}>
                        <NavigationMenuLink asChild>
                          <NavLink
                            to={`/dashboard/category/${cat.toLowerCase()}`}
                            className={({ isActive }) =>
                              cn(
                                "block select-none rounded-md p-3 transition-colors hover:bg-accent hover:text-accent-foreground",
                                isActive && "bg-accent text-accent-foreground font-bold"
                              )
                            }
                          >
                            <div className="text-sm font-medium">{cat}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                              View all products in {cat}
                            </p>
                          </NavLink>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;
