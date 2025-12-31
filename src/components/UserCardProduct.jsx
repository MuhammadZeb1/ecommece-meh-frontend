import { User } from "lucide-react";
import React from "react";

const UserCardProduct = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      <h3 className="text-md font-bold mb-1">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.description}</p>

      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-lg">
          ${product.price.toFixed(2)}
        </span>
        {product.category?.subCategory && (
          <span className="text-xs text-gray-400">
            {product.category.subCategory}
          </span>
        )}
      </div>

      {/* Color / variants placeholder */}
      <div className="flex items-center gap-2 mb-2">
        {/* Example static colors */}
        <span className="w-4 h-4 rounded-full bg-black border"></span>
        <span className="w-4 h-4 rounded-full bg-gray-300 border"></span>
        <span className="w-4 h-4 rounded-full bg-white border"></span>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  );
};

export default UserCardProduct;
