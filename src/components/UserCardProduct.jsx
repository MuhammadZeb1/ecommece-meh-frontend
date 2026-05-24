import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";
import { 
  ShoppingCart, 
  ShoppingBag, 
  Info, 
  Star,
  ShieldCheck,
  Zap
} from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Professional User Product Card (E-commerce)
 * 
 * Features:
 * - High-conversion layout with clear CTA
 * - Scarcity indicators (Low stock alerts)
 * - Animated interactions and hover effects
 * - Modern typography and visual hierarchy
 * - Visual status badges for availability
 */

const UserCardProduct = ({ product }) => {
  const dispatch = useDispatch();
  
  // Get current cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);
  
  // Find this specific product in the cart
  const cartItem = cartItems.find((item) => item._id === product._id);
  const qtyInCart = cartItem ? (cartItem.cartQty || cartItem.quantity || 0) : 0;

  // Stock logic
  const isOutOfStock = product.quantity <= 0;
  const isLimitReached = qtyInCart >= product.quantity;
  const isLowStock = product.quantity > 0 && product.quantity < 10;

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return null;
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: `Expired ${Math.abs(diffDays)}d ago`, style: "bg-rose-50 text-rose-600 border-rose-100" };
    }
    if (diffDays <= 7) {
      return { label: `Expiring in ${diffDays}d`, style: "bg-amber-50 text-amber-600 border-amber-100" };
    }
    return { label: `Expires in ${diffDays}d`, style: "bg-emerald-50 text-emerald-600 border-emerald-100" };
  };

  const expiryStatus = getExpiryStatus(product.expiryDate);

  const handleAddToCart = () => {
    if (!isLimitReached) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100 hover:border-indigo-100">
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isLowStock && !isOutOfStock && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg animate-pulse">
              <Zap size={12} fill="currentColor" />
              Limited Stock
            </div>
          )}
          {isOutOfStock && (
            <div className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
              Sold Out
            </div>
          )}
        </div>

        {/* Quick View / Interaction Overlay */}
        <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-colors duration-300" />
      </div>

      {/* CONTENT AREA */}
      <div className="flex flex-col p-5 flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          {product.category && (
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
              {product.category.name}
            </span>
          )}
          
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
          {product.description || "No description available for this premium item."}
        </p>

        {/* Price & Stock Status */}
        <div className="mt-auto pt-4 border-t border-slate-100 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium mb-0.5">Price</span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <div className="space-y-2 text-right">
            <div className={cn(
              "flex items-center justify-end gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border",
              isOutOfStock 
                ? "bg-rose-50 text-rose-600 border-rose-100" 
                : isLowStock 
                  ? "bg-amber-50 text-amber-600 border-amber-100"
                  : "bg-emerald-50 text-emerald-600 border-emerald-100"
            )}>
              <div className={cn("w-1.5 h-1.5 rounded-full", 
                isOutOfStock ? "bg-rose-500" : isLowStock ? "bg-amber-500" : "bg-emerald-500"
              )} />
              {isOutOfStock ? "No Stock" : `${product.quantity} Available`}
            </div>
            {expiryStatus && (
              <div className={cn(
                "flex items-center justify-end gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border",
                expiryStatus.style
              )}>
                {expiryStatus.label}
              </div>
            )}
          </div>
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isLimitReached}
          className={cn(
            "mt-5 w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-sm",
            (isOutOfStock || isLimitReached)
              ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
              : isLowStock
                ? "bg-amber-500 text-white hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-100 active:scale-95"
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-100 active:scale-95"
          )}
        >
          {isOutOfStock ? (
            <>
              <Info size={18} />
              Out of Stock
            </>
          ) : isLimitReached ? (
            <>
              <ShieldCheck size={18} />
              In Your Cart
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              {isLowStock ? `Hurry, Only ${product.quantity} Left!` : "Add to Cart"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCardProduct;
