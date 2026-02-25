import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaSignInAlt, FaTachometerAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "../lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

function AdminNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get token & role from Redux state
  const { token, role } = useSelector((state) => state.auth);

  


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

      {/* Navigation */}
      <NavigationMenu>
        <NavigationMenuList className="gap-2">

          {/* Always show Home */}
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

          {/* If logged in */}
          {token ? (
            <>
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

              {/* Create Product */}
              <NavigationMenuItem>
                <NavLink
                  to="/createProduct"
                  className={({ isActive }) =>
                    cn(
                      navigationMenuTriggerStyle(),
                      "flex gap-2 items-center",
                      isActive && "bg-accent text-accent-foreground font-bold"
                    )
                  }
                >
                  <FaPlus /> Create Product
                </NavLink>
              </NavigationMenuItem>

              {/* Logout */}
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
              {/* If NOT logged in */}
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

export default AdminNavbar;
