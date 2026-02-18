import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../redux/cart/cartSlice";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  console.log("items", items);

  const dispatch = useDispatch();

  // safer total calculation
  const total = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (items.length === 0) {
    return <p className="text-center p-10">Cart is empty</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {items.map((item) => (
        <div
          key={item._id}
          className="flex gap-4 items-center border-b py-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p>${item.price}</p>

            <div className="flex gap-2 items-center mt-2">
              <button
                onClick={() => dispatch(decreaseQty(item._id))}
                className="px-2 border"
              >
                -
              </button>

              <span>{item.quantity || 1}</span>

              <button
                onClick={() => dispatch(increaseQty(item._id))}
                className="px-2 border"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => dispatch(removeFromCart(item._id))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-6">
        <h2 className="text-xl font-bold">
          Total: ${total.toFixed(2)}
        </h2>

        <button
          onClick={() => dispatch(clearCart())}
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
