import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/products/productsSlice";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/updateProduct/${product._id}`);
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      
      {/* IMAGE */}
      <figure className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full object-cover transition-transform duration-300 hover:scale-110"
        />

        {/* PRICE BADGE */}
        <span className="badge badge-primary absolute top-3 right-3 text-lg px-3 py-3">
          ${product.price}
        </span>
      </figure>

      {/* BODY */}
      <div className="card-body flex flex-col justify-between">
        <div>
          <h2 className="card-title text-xl font-bold">
            {product.name}
          </h2>

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
          <button
            onClick={() => dispatch(deleteProduct(product._id))}
            className="btn btn-error btn-outline btn-sm flex items-center gap-1"
          >
            <FaTrash /> Delete
          </button>

          <button
            onClick={handleUpdate}
            className="btn btn-primary btn-sm flex items-center gap-1"
          >
            <FaEdit /> Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
