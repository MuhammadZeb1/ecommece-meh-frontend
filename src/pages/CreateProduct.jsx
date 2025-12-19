import { useDispatch } from "react-redux";
import { addProduct } from "../redux/products/productsSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(addProduct(formData));
    e.target.reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Create Product</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <input
              name="price"
              placeholder="Price"
              className="input input-bordered w-full"
            />
            <input
              name="categoryName"
              placeholder="Category"
              className="input input-bordered w-full"
            />
            <input
              name="subCategory"
              placeholder="Sub Category"
              className="input input-bordered w-full"
            />
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
            />
            <input
              type="file"
              name="image"
              className="file-input w-full"
            />
            <button className="btn btn-primary w-full">
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
