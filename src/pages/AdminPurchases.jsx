import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminPurchases, deleteAdminPurchase } from "../redux/purchase/purchaseSlice";
import { toast } from "react-toastify";
import { Trash2, User, Package, Calendar, DollarSign } from "lucide-react";

const AdminPurchases = () => {
  const dispatch = useDispatch();
  const { purchases, loading, error } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(fetchAdminPurchases())
      .unwrap()
      .catch((err) => toast.error("Failed to fetch admin purchases: " + err));
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this purchase record? This cannot be undone.")) {
      dispatch(deleteAdminPurchase(id))
        .unwrap()
        .then(() => toast.success("Purchase record deleted"))
        .catch((err) => toast.error("Delete failed: " + err));
    }
  };

  // Calculate total revenue for the summary
  const totalRevenue = purchases.reduce((acc, curr) => acc + curr.price, 0);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  );

  if (error) return (
    <div className="alert alert-error max-w-4xl mx-auto mt-10 text-white">
      <span>{error}</span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* --- HEADER & STATS --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Master Sales Registry</h1>
          <p className="text-gray-500">Overview of all customer transactions</p>
        </div>
        <div className="stats shadow bg-primary text-primary-content">
          <div className="stat">
            <div className="stat-title text-primary-content opacity-70">Total Revenue</div>
            <div className="stat-value text-2xl">${totalRevenue.toFixed(2)}</div>
            <div className="stat-desc text-primary-content opacity-70">{purchases.length} Sales total</div>
          </div>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            {/* head */}
            <thead className="bg-gray-50">
              <tr className="text-gray-600 uppercase text-xs">
                <th className="py-4">Product</th>
                <th>Customer</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {purchases.map((purchase) => (
                <tr key={purchase._id} className="hover:bg-blue-50/30 transition-colors">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={purchase.product?.image || "https://via.placeholder.com/50"} alt="Product" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{purchase.product?.name}</div>
                        <div className="text-xs opacity-50">ID: ...{purchase._id.slice(-5)}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium flex items-center gap-1">
                        <User size={14} /> {purchase.customer?.name || "Guest"}
                      </span>
                      <span className="text-xs text-gray-400">{purchase.customer?.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost font-mono">{purchase.quantity}</span>
                  </td>
                  <td className="font-bold text-green-600">
                    ${purchase.price.toFixed(2)}
                  </td>
                  <td>
                    <div className="text-xs">
                      {new Date(purchase.purchasedAt).toLocaleDateString()}
                    </div>
                    <div className="text-[10px] opacity-40">
                      {new Date(purchase.purchasedAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <th className="text-right">
                    <button 
                      onClick={() => handleDelete(purchase._id)}
                      className="btn btn-ghost btn-sm text-red-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {purchases.length === 0 && (
        <div className="text-center py-20">
          <Package size={48} className="mx-auto text-gray-200 mb-2" />
          <p className="text-gray-400">No transactions recorded yet.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPurchases;