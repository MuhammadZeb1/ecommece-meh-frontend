import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../redux/products/productsSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, 
  Edit3, 
  Box, 
  Tag, 
  Layers,
  MoreVertical,
  ExternalLink
} from "lucide-react";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

/**
 * Professional Product Card Component
 * 
 * Features:
 * - High-end aesthetic with soft shadows and refined borders
 * - Dynamic status indicators (Stock levels)
 * - Smooth Framer Motion animations (entry, hover, exit)
 * - Modern Lucide-react iconography
 * - Responsive layout with line-clamping for clean typography
 * - Improved Action area with better visual hierarchy
 */

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    dispatch(deleteProduct(product._id));
    toast.success("Product deleted successfully", {
      position: "bottom-right",
      icon: "✅",
    });
    // Animate out
    setIsVisible(false);
  };

  const handleUpdate = () => {
    navigate(`/updateProduct/${product._id}`);
  };

  // Stock status helper
  const getStockStatus = (qty) => {
    if (qty <= 0) return { label: "Out of Stock", color: "bg-rose-100 text-rose-600 border-rose-200" };
    if (qty <= 5) return { label: "Low Stock", color: "bg-amber-100 text-amber-600 border-amber-200" };
    return { label: "In Stock", color: "bg-emerald-100 text-emerald-600 border-emerald-200" };
  };

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return null;
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: `Expired ${Math.abs(diffDays)}d ago`, color: "bg-rose-100 text-rose-600 border-rose-200" };
    }
    if (diffDays <= 7) {
      return { label: `Expiring in ${diffDays}d`, color: "bg-amber-100 text-amber-600 border-amber-200" };
    }
    return { label: `Expires in ${diffDays}d`, color: "bg-emerald-100 text-emerald-600 border-emerald-200" };
  };

  const stockStatus = getStockStatus(product.quantity);
  const expiryStatus = getExpiryStatus(product.expiryDate);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          whileHover={{ y: -4 }}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl hover:border-indigo-100"
        >
          {/* IMAGE SECTION */}
          <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Price Overlay */}
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-900/5">
                <Tag size={14} className="text-indigo-600" />
                ${product.price}
              </div>
            </div>

            {/* Category Badge */}
            {product.category && (
              <div className="absolute top-3 left-3">
                <div className="flex items-center gap-1.5 rounded-lg bg-slate-900/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  <Layers size={12} />
                  {product.category.name}
                </div>
              </div>
            )}
          </div>

          {/* CONTENT BODY */}
          <div className="flex flex-1 flex-col p-5">
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Sub-category if exists */}
              {product.category?.subCategory && (
                <p className="mt-1 text-xs font-medium text-slate-400">
                  {product.category.subCategory}
                </p>
              )}

              {/* STOCK & DETAILS */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Box size={14} className="text-slate-400" />
                  <span className="text-xs font-medium text-slate-500">Inventory:</span>
                </div>
                <span className={cn(
                  "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight",
                  stockStatus.color
                )}>
                  {product.quantity} Units • {stockStatus.label}
                </span>
                {expiryStatus && (
                  <span className={cn(
                    "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight",
                    expiryStatus.color
                  )}>
                    {expiryStatus.label}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              {product.description && (
                <p className="mt-4 text-sm leading-relaxed text-slate-500 line-clamp-2 italic">
                  "{product.description}"
                </p>
              )}
            </div>

            {/* ACTION FOOTER */}
            <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
              <ConfirmDialog
                trigger={
                  <button
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50/50 py-2.5 text-xs font-bold text-rose-600 transition-all hover:bg-rose-100 active:scale-95"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                }
                title="Confirm Deletion"
                description={`Are you sure you want to remove "${product.name}" from your inventory? This action cannot be undone.`}
                onConfirm={handleDelete}
                confirmText="Delete Product"
                cancelText="Keep it"
              />

              <Button
                onClick={handleUpdate}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition-all hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
              >
                <Edit3 size={14} />
                Update
              </Button>
            </div>
          </div>
          
        </motion.div>
        
      )}
    </AnimatePresence>
  );
};

export default ProductCard;
