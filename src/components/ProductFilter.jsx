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

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // First filter by URL category if exists
    const categoryFiltered = category
      ? items.filter(
          (p) =>
            p.category?.name?.toLowerCase() === category.toLowerCase()
        )
      : items;

    setProducts(categoryFiltered);
    setFilteredProducts(categoryFiltered);
  }, [items, category]);

  if (loading)
    return <p className="text-center mt-4">Loading products...</p>;

  return (
    <div className="min-h-screen w-full p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">
        {category ? `${category} Products` : "All Products"}
      </h1>

      {/* Filter UI */}
      <div className="mb-6 p-4 bg-white rounded-md shadow-sm">
        <ProductFilter
          products={products}
          onFilterChange={setFilteredProducts}
        />
      </div>

      {/* Products Grid */}
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
