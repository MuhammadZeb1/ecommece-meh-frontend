import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminPurchases, deleteAdminPurchase } from "../redux/purchase/purchaseSlice";
import { toast } from "react-toastify";
import { 
  Trash2, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Package, 
  TrendingUp, 
  Calendar,
  CreditCard,
  Search,
  Download,
  Filter,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Professional Admin Purchases Dashboard
 * 
 * Features:
 * - High-level metric overview cards
 * - Data-rich transaction rows with clear hierarchy
 * - Modern typography and sophisticated color palette
 * - Responsive layout with polished interactions
 * - Status indicators and metadata tagging
 */

const AdminPurchases = () => {
  const dispatch = useDispatch();
  const { adminPurchases: purchases, loading, error } = useSelector((state) => state.purchase);

  useEffect(() => {
    dispatch(fetchAdminPurchases())
      .unwrap()
      .catch((err) => toast.error("Failed to fetch admin purchases: " + err));
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction record? This cannot be undone.")) {
      dispatch(deleteAdminPurchase(id))
        .unwrap()
        .then(() => toast.success("Record deleted"))
        .catch((err) => toast.error("Delete failed: " + err));
    }
  };

  const totalRevenue = purchases?.reduce((acc, curr) => acc + curr.price, 0) || 0;
  const totalOrders = purchases?.length || 0;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-[500px] gap-4">
      <div className="relative flex h-12 w-12">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-12 w-12 bg-indigo-600"></span>
      </div>
      <p className="text-slate-500 font-medium animate-pulse">Loading secure data...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 text-rose-700">
      <div className="bg-rose-100 p-2 rounded-lg"><Info className="w-5 h-5" /></div>
      <span className="font-medium">{error}</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 min-h-screen">
      {/* --- DASHBOARD HEADER --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sales Registry</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitoring global transactions and fulfillment</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
            <Filter size={18} /> Filter Results
          </button>
        </div>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Orders", value: totalOrders, icon: Package, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Avg. Order Value", value: `$${averageOrderValue.toFixed(2)}`, icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2.5 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lifetime</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* --- TRANSACTIONS LIST --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Recent Transactions
            <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">{totalOrders}</span>
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all w-64"
            />
          </div>
        </div>

        <div className="grid gap-6">
          {purchases?.map((purchase) => (
            <div key={purchase._id} className="group bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* 1. Product Preview Section */}
                <div className="w-full lg:w-56 bg-slate-50/50 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
                  <div className="relative group/img">
                    <img 
                      src={purchase.product?.image || "https://via.placeholder.com/150"} 
                      className="h-32 w-32 object-cover rounded-2xl shadow-lg ring-4 ring-white transition-transform duration-500 group-hover/img:scale-105"
                      alt="Product"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg shadow-md border border-slate-100">
                      <Package size={14} className="text-indigo-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-full">
                      {purchase.quantity} Units
                    </span>
                  </div>
                </div>

                {/* 2. Detailed Info Section */}
                <div className="flex-1 p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                        {purchase.product?.name}
                        <ExternalLink size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Transaction ID</span>
                        <code className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">#{purchase._id.slice(-12)}</code>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount Paid</p>
                        <p className="text-2xl font-black text-emerald-600">${purchase.price.toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => handleDelete(purchase._id)}
                        className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Customer & Delivery */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Fulfillment Details</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm group/item">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                            <User size={16} />
                          </div>
                          <span className="font-bold text-slate-700">{purchase.customer?.name || "Anonymous Client"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm group/item">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                            <MapPin size={16} />
                          </div>
                          <span className="text-slate-500 font-medium">{purchase.customer?.address || "Digital Delivery / No Address"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm group/item">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                            <Phone size={16} />
                          </div>
                          <span className="text-slate-500 font-medium tracking-wide">{purchase.customer?.phone || "+1 --- --- ----"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Status */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-2">Account Contact</h4>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Mail size={16} className="text-slate-400" />
                          <span className="text-slate-600 font-medium truncate">{purchase.customer?.email}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Payment Status</span>
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-full">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timeline Footer */}
              <div className="bg-slate-50/80 px-8 py-3 flex justify-between items-center border-t border-slate-100">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar size={12} />
                  Processed: {new Date(purchase.purchasedAt).toLocaleDateString()} at {new Date(purchase.purchasedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <button className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group/link">
                  MANAGE ORDER <ChevronRight size={12} className="transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- EMPTY STATE --- */}
      {(!purchases || purchases.length === 0) && (
        <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200 mt-10">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Transactions Found</h3>
          <p className="text-slate-500 mt-2 max-w-xs mx-auto">Your sales registry is currently empty. New orders will appear here automatically.</p>
          <button className="mt-8 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            Refresh Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPurchases;
