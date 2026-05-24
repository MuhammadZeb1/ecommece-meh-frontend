import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts, updateProduct } from "../redux/products/productsSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

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

    // Convert checkbox to boolean for the backend
    const requiresPrescription = e.target.requiresPrescription.checked;
    formData.set("requiresPrescription", requiresPrescription);

    dispatch(updateProduct({ id, formData }))
      .unwrap()
      .then(() => {
        toast.success("Medication updated successfully!");
        navigate(-1);
      })
      .catch((err) => {
        toast.error(err || "Failed to update medication");
      });
  };

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-slate-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="card w-full max-w-2xl shadow-xl bg-white border border-slate-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => navigate(-1)} className="btn btn-sm btn-ghost gap-2">
              ← Back to Inventory
            </button>
            <div className="badge badge-outline border-slate-300 px-4 py-3 font-mono text-xs">
              SKU: {product.sku || "N/A"}
            </div>
          </div>

          <h2 className="card-title text-2xl font-bold text-slate-800">Update Medication</h2>
          <p className="text-sm text-slate-500 mb-6">Modify pharmaceutical details and inventory levels.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold text-xs uppercase text-slate-500">Brand Name</label>
                <input name="name" defaultValue={product.name} className="input input-bordered w-full focus:input-primary" required />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-xs uppercase text-slate-500">Generic Name (Molecule)</label>
                <input name="genericName" defaultValue={product.genericName} className="input input-bordered w-full" required />
              </div>
            </div>

            {/* 2. Medical Specifics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label font-semibold text-xs uppercase text-slate-500">Dosage Form</label>
                <select name="dosageForm" defaultValue={product.dosageForm} className="select select-bordered w-full">
                  {['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops'].map(form => (
                    <option key={form} value={form}>{form}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label font-semibold text-xs uppercase text-slate-500">Strength</label>
                <input name="strength" defaultValue={product.strength} placeholder="e.g. 500mg" className="input input-bordered w-full" required />
              </div>
              <div className="form-control flex flex-row items-center pt-8 gap-2">
                <input type="checkbox" name="requiresPrescription" defaultChecked={product.requiresPrescription} className="checkbox checkbox-primary" id="rx-check" />
                <label htmlFor="rx-check" className="text-xs font-bold cursor-pointer text-red-600">Rx Required</label>
              </div>
            </div>

            {/* 3. Pricing & Inventory */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label font-semibold text-xs uppercase text-slate-500">Sale Price ($)</label>
                <input name="price" type="number" step="0.01" defaultValue={product.price} className="input input-bordered w-full" required />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-xs uppercase text-slate-500">Quantity In Stock</label>
                <input name="quantity" type="number" defaultValue={product.quantity} className="input input-bordered w-full font-bold text-primary" required />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-xs uppercase text-slate-500">Batch Number</label>
                <input name="batchNumber" defaultValue={product.batchNumber} className="input input-bordered w-full" />
              </div>
            </div>

            {/* 4. Dates & Safety */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold text-xs uppercase text-slate-500">Expiry Date</label>
                <input 
                  name="expiryDate" 
                  type="date" 
                  defaultValue={product.expiryDate ? new Date(product.expiryDate).toISOString().split('T')[0] : ''} 
                  className="input input-bordered w-full" 
                  required 
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-xs uppercase text-slate-500">Category (Therapeutic Class)</label>
                <input name="categoryName" defaultValue={product.category?.name} placeholder="e.g. Antibiotics" className="input input-bordered w-full" />
              </div>
            </div>

            {/* 5. Medical Guidance */}
            <div className="form-control">
              <label className="label font-semibold text-xs uppercase text-slate-500">How to Use</label>
              <textarea name="howToUse" defaultValue={product.howToUse} className="textarea textarea-bordered h-20" />
            </div>

            <div className="form-control">
              <label className="label font-semibold text-xs uppercase text-slate-500">Replace Product Image</label>
              <input type="file" name="file" className="file-input file-input-bordered file-input-primary w-full" />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="btn btn-primary w-full shadow-lg shadow-blue-200"
            >
              Update Pharmacy Record
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UpdateProductPage;