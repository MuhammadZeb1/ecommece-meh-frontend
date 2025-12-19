import { useSelector, useDispatch } from "react-redux";
import { useParams,  } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts, updateProduct } from "../redux/products/productsSlice";

const UpdateProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.items.find(p => p._id === id));

  useEffect(() => {
    if (!product) dispatch(fetchProducts());
  }, [dispatch, product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(updateProduct({ id, formData }));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
      <input name="name" defaultValue={product.name} placeholder="Name" className="input input-bordered w-full" />
      <input name="price" defaultValue={product.price} placeholder="Price" className="input input-bordered w-full" />
      <input name="categoryName" defaultValue={product.category.name} placeholder="Category" className="input input-bordered w-full" />
      <input name="subCategory" defaultValue={product.category.subCategory} placeholder="Sub Category" className="input input-bordered w-full" />
      <textarea name="description" defaultValue={product.description} className="textarea textarea-bordered w-full" />
      <input type="file" name="image" className="file-input w-full" />
      <button className="btn btn-primary w-full">Update Product</button>
    </form>
  );
};

export default UpdateProductPage;
