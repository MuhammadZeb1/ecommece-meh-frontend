import { useDispatch } from "react-redux";
import { createProduct } from "../redux/products/productService";

const CreateProduct = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    dispatch(createProduct(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" placeholder="Name" />
      <input name="price" placeholder="Price" />
      <input name="categoryName" placeholder="Category" />
      <input name="subCategory" placeholder="Sub Category" />
      <textarea name="description" />
      <input type="file" name="image" />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateProduct;
