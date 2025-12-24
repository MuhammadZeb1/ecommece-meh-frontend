import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/products/productsSlice";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setProducts(items);
  }, [items]);

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Category: Men</h1>

      {products.length === 0 ? (
        <p className="text-center mt-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
