import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice"; // adjust path if needed

const UserCardProduct = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("click ,",product)
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md bg-white">
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
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default UserCardProduct;
