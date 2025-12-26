import { useDispatch } from "react-redux";
import { addProduct } from "../redux/products/productsSlice";
import { useRef } from "react";
import { toast } from "react-toastify"; // Optional: for feedback

const CreateProduct = () => {
  const dispatch = useDispatch();
  const bulkInputRef = useRef(null);

  // 1. Handle Single Product
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Dispatch the thunk you provided
    dispatch(addProduct(formData))
      .unwrap()
      .then(() => {
        toast.success("Product created!");
        e.target.reset();
      })
      .catch((err) => toast.error(err));
  };

  // 2. Handle Bulk Upload
  const handleBulkFileChange = (e) => {
    console.log("1")
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    // Use "file" as the key to match your backend: upload.single("file")
    formData.append("file", file); 

    dispatch(addProduct(formData))
      .unwrap()
      .then(() => {
        toast.success("Bulk products uploaded successfully!");
        e.target.value = null;
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Add New Products</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="name" placeholder="Name" className="input border border-black w-full" required />
            <input name="price" placeholder="Price" className="input border border-black w-full" type="number" required />
            <input name="categoryName" placeholder="Category" className="input border border-black w-full" />
            <input name="subCategory" placeholder="Sub Category" className="input border border-black w-full" />
            <textarea name="description" placeholder="Description" className="textarea border border-black w-full" />
            
            <div className="form-control">
              <label className="label text-xs font-bold">Product Image</label>
              <input type="file" name="file" className="file-input file-input-bordered w-full" accept="image/*" />
            </div>

            <button type="submit" className="btn btn-primary w-full">Create Single Product</button>
          </form>

          <div className="divider text-gray-400">OR</div>

          {/* Hidden Bulk Input */}
          <input 
            type="file" 
            ref={bulkInputRef} 
            onChange={handleBulkFileChange} 
            accept=".csv, .xlsx, .xls" 
            className="hidden" 
          />
          
          <button 
            type="button" 
            onClick={() => bulkInputRef.current.click()} 
            className="btn btn-outline btn-secondary w-full"
          >
            Upload CSV / Excel Bundle
          </button>
          <p className="text-[10px] text-center mt-2 opacity-60">Upload a spreadsheet to add multiple products at once.</p>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;