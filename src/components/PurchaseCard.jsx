import React from "react";
import { useDispatch } from "react-redux";
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity 
} from "../redux/cart/cartSlice";
import { 
  Trash2, 
  Plus, 
  Minus, 
  Package, 
  ShoppingBag,
  Info
} from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Professional Cart Item Component
 * 
 * Features:
 * - Clean horizontal layout with refined spacing
 * - Interactive quantity controls with feedback
 * - Modern typography and visual hierarchy
 * - Subtle transitions and hover states
 * - High-quality action buttons (Remove, Adjust)
 */

const PurchaseCard = ({ item }) => {
  const dispatch = useDispatch();
  const { _id, name, image, price, cartQty, quantity: stockQuantity, category } = item;

  const handleRemove = () => {
    dispatch(removeFromCart(_id));
  };

  const handleIncrease = () => {
    if (cartQty < stockQuantity) {
      dispatch(increaseQuantity(_id));
    }
  };

  const handleDecrease = () => {
    if (cartQty > 1) {
      dispatch(decreaseQuantity(_id));
    }
  };

  const isLimitReached = cartQty >= stockQuantity;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:border-indigo-100">
      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
        {/* PRODUCT IMAGE */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-xl border border-slate-100 shadow-sm transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-200">
              <Package className="text-slate-300" size={32} />
            </div>
          )}
          
          {/* Item Index/Counter Badge */}
          <div className="absolute -top-2 -left-2 bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold shadow-lg ring-2 ring-white">
            <ShoppingBag size={10} />
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="flex-1 flex flex-col w-full min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0">
              {category && (
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1 block">
                  {category.name}
                </span>
              )}
              <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                {name}
              </h3>
              <p className="text-sm font-semibold text-slate-500 mt-0.5">
                ${price.toFixed(2)} <span className="text-slate-300 font-normal">/ unit</span>
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-90"
              title="Remove from cart"
            >
              <Trash2 size={20} />
            </button>
          </div>

          {/* CONTROLS & TOTAL */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-1">
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-sm">
                <button
                  onClick={handleDecrease}
                  disabled={cartQty <= 1}
                  className={cn(
                    "p-1.5 rounded-lg transition-all",
                    cartQty <= 1 
                      ? "text-slate-300 cursor-not-allowed" 
                      : "text-slate-600 hover:bg-white hover:shadow-sm active:scale-90"
                  )}
                >
                  <Minus size={16} />
                </button>
                
                <span className="w-10 text-center text-sm font-bold text-slate-900">
                  {cartQty}
                </span>
                
                <button
                  onClick={handleIncrease}
                  disabled={isLimitReached}
                  className={cn(
                    "p-1.5 rounded-lg transition-all",
                    isLimitReached 
                      ? "text-slate-300 cursor-not-allowed" 
                      : "text-slate-600 hover:bg-white hover:shadow-sm active:scale-90"
                  )}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              {isLimitReached && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100 ml-2 animate-pulse">
                  <Info size={12} />
                  Stock Limit
                </span>
              )}
            </div>

            {/* Item Total Price */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Subtotal</span>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                ${(price * cartQty).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCard;
