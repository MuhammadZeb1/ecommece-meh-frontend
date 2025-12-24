import { useEffect, useMemo, useState } from "react";

const ProductFilter = ({ products = [], onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    price: 1000,
  });

  const categories = ["Men", "Women", "Kids"];

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchName = product.name
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchCategory = filters.category
        ? product.category?.name?.toLowerCase() ===
          filters.category.toLowerCase()
        : true;

      const matchPrice = product.price <= filters.price;

      return matchName && matchCategory && matchPrice;
    });
  }, [products, filters]);

  useEffect(() => {
    onFilterChange(filteredProducts);
  }, [filteredProducts, onFilterChange]);

  return (
    <div className="space-y-5">

      {/* ✅ PRICE SLIDER (VISIBLE NOW) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Max Price: <span className="font-semibold">${filters.price}</span>
        </label>

        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={filters.price}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          className="w-full accent-slate-900 cursor-pointer"
        />
      </div>

      <input
        type="text"
        placeholder="Search by name"
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />

      <select
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="w-full px-3 py-2 border rounded-md bg-white"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        onClick={() =>
          setFilters({ search: "", category: "", price: 1000 })
        }
        className="w-full px-4 py-2 border rounded-md hover:bg-gray-100"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilter;
