import { ConfirmDialog } from "../common/ConfirmDialog";
import { Button } from "./ui/button";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/products/productsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    dispatch(deleteProduct(product._id));
    toast.success("Product deleted successfully ✅", {
      position: "bottom-right",
    });
    // Animate out
    setIsVisible(false);
  };

  const handleUpdate = () => {
    navigate(`/updateProduct/${product._id}`);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="card bg-base-100 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.03 }}
        >
          {/* IMAGE */}
          <figure className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-52 w-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <span className="badge badge-primary absolute top-3 right-3 text-lg px-3 py-3">
              ${product.price}
            </span>
          </figure>

          {/* BODY */}
          <div className="card-body flex flex-col justify-between">
            <div>
              <h2 className="card-title text-xl font-bold">{product.name}</h2>

              {/* CATEGORY */}
              {product.category && (
                <div className="mt-2">
                  <span className="badge badge-outline badge-sm">
                    {product.category.name}
                    {product.category.subCategory
                      ? ` / ${product.category.subCategory}`
                      : ""}
                  </span>
                </div>
              )}

              {/* DESCRIPTION */}
              {product.description && (
                <p className="text-gray-600 mt-3 line-clamp-3 text-sm">
                  {product.description}
                </p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="card-actions justify-end mt-4 gap-2">
              {/* DELETE */}
              <ConfirmDialog
                trigger={
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </Button>
                }
                title="Delete Product?"
                description="This will permanently delete this product."
                onConfirm={handleDelete}
                confirmText="Delete"
                cancelText="Cancel"
              />

              {/* UPDATE */}
              <Button
                size="sm"
                onClick={handleUpdate}
                className="flex items-center gap-1"
              >
                <FaEdit /> Update
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductCard;
