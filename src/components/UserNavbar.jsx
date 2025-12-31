import React from 'react'
import { Link } from 'react-router-dom';

export default function UserNavbar() {
   return (
    <div className="flex gap-6 p-4 bg-gray-100">
      <Link
        to="/user/products/men"
        className="hover:text-blue-600 font-medium"
      >
        Men
      </Link>

      <Link
        to="/user/products/women"
        className="hover:text-blue-600 font-medium"
      >
        Women
      </Link>

      <Link
        to="/user/products/kids"
        className="hover:text-blue-600 font-medium"
      >
        Kids
      </Link>

      <Link
        to="/user/products/electronics"
        className="hover:text-blue-600 font-medium"
      >
        Electronics
      </Link>
    </div>
  );
}
