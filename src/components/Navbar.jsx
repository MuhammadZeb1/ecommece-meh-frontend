// components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaSignInAlt, FaTachometerAlt, FaPlus } from "react-icons/fa";


function Navbar() {
  const navLinks = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Signup", path: "/signup", icon: <FaUser /> },
  { name: "Login", path: "/login", icon: <FaSignInAlt /> },
  { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> }, // replaced FaDashboard
  { name: "Create Product", path: "/createProduct", icon: <FaPlus /> },
];


  return (
    <div className="navbar bg-base-100 shadow-md">
      {/* Left side: Logo */}
      <div className="flex-1 px-4">
        <span className="text-2xl font-bold text-blue-600">MyProject</span>
      </div>

      {/* Right side: Navigation */}
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-1 text-white bg-blue-600 px-3 py-2 rounded-md"
                    : "flex items-center gap-1 text-gray-700 hover:text-white hover:bg-blue-500 px-3 py-2 rounded-md"
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
