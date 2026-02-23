import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice"; 

const UserCardProduct = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md bg-white transition-all">
      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      {/* PRODUCT TITLE */}
      <h3 className="text-md font-bold mb-1">{product.name}</h3>
      
      {/* CATEGORY & SUBCATEGORY (Matching your Schema) */}
      {product.category && (
        <p className="text-xs text-blue-600 font-medium mb-1">
          {product.category.name} {product.category.subCategory ? `• ${product.category.subCategory}` : ""}
        </p>
      )}

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>

      <div className="flex items-center justify-between mb-4">
        {/* PRICE */}
        <span className="font-bold text-lg text-gray-900">
          ${product.price.toFixed(2)}
        </span>

        {/* QUANTITY (Matching your Schema) */}
        <div className="flex flex-col items-end">
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm ${
            product.quantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {product.quantity > 0 ? `Stock: ${product.quantity}` : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={handleAddToCart}
        disabled={product.quantity <= 0}
        className={`w-full py-2.5 rounded-md font-semibold text-white transition-all ${
          product.quantity <= 0 
            ? "bg-gray-300 cursor-not-allowed" 
            : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
        }`}
      >
        {product.quantity <= 0 ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
};

export default UserCardProduct;