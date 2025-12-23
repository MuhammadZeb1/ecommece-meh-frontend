import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaSignInAlt, FaTachometerAlt, FaPlus } from "react-icons/fa";
// Replace the old import with this:
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"; // Use "./ui/..." because Navbar is in the same parent folder
import { cn } from "../lib/utils"; // Use "../lib/..." to go up one level to find lib

function Navbar() {
  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Signup", path: "/signup", icon: <FaUser /> },
    { name: "Login", path: "/login", icon: <FaSignInAlt /> },
    { name: "Create Product", path: "/createProduct", icon: <FaPlus /> },
  ];

  const categories = ["Men", "Women", "Kids"];

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      {/* Left side: Logo */}
      <div className="flex-1">
        <span className="text-2xl font-bold text-blue-600">MyProject</span>
      </div>

      {/* Right side: Navigation */}
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          
          {/* Static Links */}
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    navigationMenuTriggerStyle(),
                    "flex gap-2 items-center",
                    isActive && "bg-accent text-accent-foreground font-bold"
                  )
                }
              >
                {link.icon} {link.name}
              </NavLink>
            </NavigationMenuItem>
          ))}

          {/* Dashboard Dropdown (The Shadcn Style) */}
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

        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;