import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts, updateProduct } from "../redux/products/productsSlice";
import { motion } from "framer-motion";

const UpdateProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.items.find((p) => p._id === id)
  );

  useEffect(() => {
    if (!product) dispatch(fetchProducts());
  }, [dispatch, product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(updateProduct({ id, formData }));
    console.log("kah")
  };

  if (!product)
    return (
      <motion.p
        className="flex items-center justify-center min-h-screen text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading...
      </motion.p>
    );

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-base-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="card w-full max-w-md shadow-lg bg-base-100"
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
      >
        <div className="card-body">
          
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-outline mb-2 w-fit"
          >
            ← Back
          </button>

          <h2 className="card-title justify-center mb-2">
            Update Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              defaultValue={product.name}
              className="input border border-black w-full"
            />
            <input
              name="price"
              defaultValue={product.price}
              type="number"
              className="input border border-black w-full"
            />
            <input
              name="categoryName"
              defaultValue={product.category?.name}
              className="input border border-black w-full"
            />
            <input
              name="subCategory"
              defaultValue={product.category?.subCategory}
              className="input border border-black w-full"
            />
            <textarea
              name="description"
              defaultValue={product.description}
              className="textarea border border-black w-full"
            />

            <input type="file" name="image" className="file-input w-full" />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary w-full"
            >
              Update Product
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UpdateProductPage;
