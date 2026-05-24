import { useDispatch } from "react-redux";
import { addProduct } from "../redux/products/productsSlice";
import { useRef } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const bulkInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    dispatch(addProduct(formData))
      .unwrap()
      .then(() => {
        toast.success("Medicine added to inventory!");
        e.target.reset();
      })
      .catch((err) => toast.error(err?.message || err));
  };

  const handleBulkFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    dispatch(addProduct(formData))
      .unwrap()
      .then(() => {
        toast.success("Bulk medical data imported!");
        e.target.value = null;
      })
      .catch((err) => toast.error(err?.message || err));
  };

  return (
    <motion.div 
      className="min-h-screen bg-slate-50 py-12 px-4"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
        initial={{ y: 20 }} 
        animate={{ y: 0 }}
      >
        {/* Pharmacy Header - Blue & White */}
        <div className="bg-blue-600 p-8 text-white">
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl">💊</span>
            <h2 className="text-2xl font-extrabold tracking-tight">Pharmacy Inventory</h2>
          </div>
          <p className="text-center text-blue-100 text-sm mt-2 font-medium">New Product Registration</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section Identification - Blue Accents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label-text text-xs font-bold text-blue-800 mb-1 uppercase">Brand Name</label>
                <input name="name" placeholder="e.g. Panadol" className="input input-bordered focus:border-green-500 w-full border-blue-200" required />
              </div>
              <div className="form-control">
                <label className="label-text text-xs font-bold text-blue-800 mb-1 uppercase">Generic Name</label>
                <input name="genericName" placeholder="e.g. Paracetamol" className="input input-bordered focus:border-green-500 w-full border-blue-200" required />
              </div>
            </div>

            {/* Section Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label-text text-xs font-bold text-blue-800 mb-1 uppercase">Form</label>
                <select name="dosageForm" className="select select-bordered w-full border-blue-200 focus:border-green-500" defaultValue="Tablet">
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Injection">Injection</option>
                  <option value="Ointment">Ointment</option>
                  <option value="Drops">Drops</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label-text text-xs font-bold text-blue-800 mb-1 uppercase">Strength</label>
                <input name="strength" placeholder="500mg / 10ml" className="input input-bordered border-blue-200 w-full focus:border-green-500" required />
              </div>
            </div>

            {/* Pricing Section - Green & White Background */}
            <div className="bg-green-50 p-5 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4 items-end border border-green-100">
              <div className="form-control">
                <label className="label-text text-[10px] font-bold text-green-700 mb-1 uppercase">Base Cost</label>
                <input name="basePrice" placeholder="$0.00" type="text" className="input input-bordered input-sm w-full border-green-200" />
              </div>
              <div className="form-control">
                <label className="label-text text-[10px] font-bold text-green-700 mb-1 uppercase">Retail Price</label>
                <input name="price" placeholder="$0.00" type="number" step="0.01" className="input input-bordered input-sm w-full border-green-200" required />
              </div>
              <div className="form-control">
                <label className="label-text text-[10px] font-bold text-green-700 mb-1 uppercase">Quantity</label>
                <input name="quantity" placeholder="0" type="number" className="input input-bordered input-sm w-full border-green-200" required />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex flex-col items-center bg-white p-1 rounded border border-green-200 h-[2.5rem]">
                  <span className="label-text font-bold text-[9px] text-blue-700">Rx Required</span>
                  <input type="checkbox" name="requiresPrescription" className="checkbox checkbox-xs checkbox-primary" />
                </label>
              </div>
            </div>

            {/* Dates and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label-text text-xs font-bold text-blue-800 mb-1 uppercase">Category</label>
                <input name="categoryName" placeholder="e.g. Analgesics" className="input input-bordered border-blue-200 w-full focus:border-green-500" required />
              </div>
              <div className="form-control">
                <label className="label-text text-xs font-bold text-blue-800 mb-1 uppercase">Expiry Date</label>
                <input name="expiryDate" type="date" className="input input-bordered border-blue-200 w-full focus:border-green-500" required />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label-text text-xs font-bold text-blue-800 mb-1 uppercase">Medical Notes</label>
              <textarea name="description" className="textarea textarea-bordered border-blue-200 w-full h-24 focus:border-green-500" placeholder="Indications, side effects, etc..." />
            </div>

            {/* Image Dropzone - Blue Border */}
            <div className="form-control">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-200 rounded-xl cursor-pointer bg-blue-50/30 hover:bg-blue-50 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-blue-600">
                  <p className="text-sm font-semibold">Upload Medicine Photo</p>
                  <p className="text-[10px] opacity-70">JPG, PNG, WEBP</p>
                </div>
                <input type="file" name="file" className="hidden" accept="image/*" required />
              </label>
            </div>

            {/* Main Action - Solid Green */}
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              type="submit" 
              className="btn bg-green-600 hover:bg-green-700 border-none w-full text-white font-bold text-lg"
            >
              Add to Inventory
            </motion.button>
          </form>

          {/* Bulk Action - Blue Link Style */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center">
            <input type="file" ref={bulkInputRef} onChange={handleBulkFileChange} accept=".csv, .xlsx, .xls" className="hidden" />
            <button 
              onClick={() => bulkInputRef.current.click()} 
              className="text-blue-600 hover:text-blue-800 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              📥 Import Bulk CSV Data
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateProduct;