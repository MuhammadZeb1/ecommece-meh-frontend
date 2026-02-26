import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminPurchases } from "../redux/checkout/checkoutSlice";
import { toast } from "react-toastify";

const AdminPurchases = () => {
  const dispatch = useDispatch();
  const { purchases, loading, error } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(fetchAdminPurchases())
      .unwrap()
      .catch((err) => toast.error("Failed to fetch admin purchases: " + err));
  }, [dispatch]);

  if (loading) return <p className="text-center p-10">Loading purchases...</p>;
  if (error) return <p className="text-center p-10 text-red-500">{error}</p>;
  if (purchases.length === 0)
    return <p className="text-center p-10 font-bold">No purchases found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">All Purchases (Admin)</h1>
      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div
            key={purchase._id}
            className="flex gap-4 p-4 border rounded items-center"
          >
            {/* Product Image */}
            {purchase.product?.image && (
              <img
                src={purchase.product.image}
                alt={purchase.product.name}
                className="w-20 h-20 object-cover rounded"
              />
            )}

            {/* Purchase Details */}
            <div>
              <p className="font-semibold">{purchase.product?.name}</p>
              <p>Quantity: {purchase.quantity}</p>
              <p>Price: ${purchase.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">
                Purchased by: {purchase.customer?.name} ({purchase.customer?.email})
              </p>
              <p className="text-gray-500 text-sm">
                Purchased at: {new Date(purchase.purchasedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPurchases;
