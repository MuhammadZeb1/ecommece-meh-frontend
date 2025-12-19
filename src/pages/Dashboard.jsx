import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/products/productsSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  if (items.length === 0 && !loading) {
    return <p className="text-center">No products available.</p>;
  }
  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {items.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
};

export default Products;
