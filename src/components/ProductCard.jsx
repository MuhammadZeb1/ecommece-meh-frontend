import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../redux/products/productsSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/updateProduct/${product._id}`);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={product.image} alt={product.name} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>${product.price}</p>

        <div className="card-actions justify-end">
          <button
            className="btn btn-error btn-sm"
            onClick={() => dispatch(deleteProduct(product._id))}
          >
            Delete
          </button>
        </div>
        <div className="card-actions justify-end">
          <button
            className="btn btn-error btn-sm"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
