import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/products/productsSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

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
      </div>
    </div>
  );
};

export default ProductCard;
