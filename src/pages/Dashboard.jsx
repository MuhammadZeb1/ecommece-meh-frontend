import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/products/productsSlice";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
};

export default Products;
