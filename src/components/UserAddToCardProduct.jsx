import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";

const UserCardProduct = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      <h3 className="font-bold">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">
        {product.description}
      </p>

      <div className="flex justify-between mb-3">
        <span className="font-semibold">
          ${product.price}
        </span>
      </div>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default UserCardProduct;
