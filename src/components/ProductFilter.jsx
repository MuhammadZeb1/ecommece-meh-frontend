import { useEffect, useMemo, useState } from "react";

const ProductFilter = ({ products = [], onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 1000,
  });

  const categories = ["Men", "Women", "Kids"];

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Memoized filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchName = product.name
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchCategory = filters.category
        ? product.category?.name?.toLowerCase() ===
          filters.category.toLowerCase()
        : true;

      const matchPrice =
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice;

      return matchName && matchCategory && matchPrice;
    });
  }, [products, filters]);

  useEffect(() => {
    onFilterChange(filteredProducts);
  }, [filteredProducts, onFilterChange]);

  return (
    <div className="w-72 bg-white shadow-md rounded-xl p-5 space-y-4 border">
      <h2 className="text-lg font-semibold text-gray-800">
        Filter Products
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* Category */}
      <select
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <div className="flex gap-3">
        <input
          type="number"
          placeholder="Min"
          value={filters.minPrice}
          onChange={(e) => handleChange("minPrice", Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.maxPrice}
          onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ProductFilter;
