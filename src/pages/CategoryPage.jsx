import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // <-- important
import { fetchProducts } from "../redux/products/productsSlice";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);

  // Get category from URL
  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // Filter products by category if category param exists
    if (category) {
      setProducts(
        items.filter(
          (p) =>
            p.category?.name?.toLowerCase() === category.toLowerCase()
        )
      );
    } else {
      setProducts(items);
    }
  }, [items, category]);

  if (loading)
    return <p className="text-center mt-4">Loading products...</p>;

  return (
    <div className="min-h-screen w-full p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">
        {category ? `${category} Products` : "All Products"}
      </h1>

      {products.length === 0 ? (
        <p className="text-center mt-4">No products found.</p>
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
