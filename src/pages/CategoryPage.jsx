import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../redux/products/productsSlice";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const { category } = useParams();

  const [baseProducts, setBaseProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      const categoryProducts = items.filter(
        (p) =>
          p.category?.name?.toLowerCase() === category.toLowerCase()
      );
      setBaseProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    } else {
      setBaseProducts(items);
      setFilteredProducts(items);
    }
  }, [items, category]);

  if (loading)
    return <p className="text-center mt-4">Loading products...</p>;

  return (
    <div className="min-h-screen w-full p-4 bg-gray-50">

      {/* 🔘 TOGGLE BUTTON */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-4 px-4 py-2 border rounded-md bg-white shadow"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* 🔥 FILTER */}
      {showFilters && (
        <ProductFilter
          products={baseProducts}
          onFilterChange={setFilteredProducts}
        />
      )}

      <h1 className="text-2xl font-bold my-6">
        {category ? `${category} Products` : "All Products"}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center mt-4">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
