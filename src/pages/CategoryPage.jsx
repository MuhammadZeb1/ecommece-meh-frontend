import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/products/productsSlice";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";

import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "../components/ui/sidebar"; // relative path safer

import { FiFilter } from "react-icons/fi";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(items);
  }, [items]);

  if (loading)
    return <p className="text-center mt-4">Loading products...</p>;

  return (
    <div className="flex">
      {/* 🧩 Sidebar */}
      <Sidebar>
        {/* 🔘 Trigger Button */}
        <SidebarTrigger className="p-4">
          <button className="btn btn-outline flex items-center gap-2">
            <FiFilter />
            Filter
          </button>
        </SidebarTrigger>

        {/* Sidebar Content */}
        <SidebarContent className="p-4 w-72">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiFilter /> Filters
          </h2>

          <ProductFilter
            products={items}
            onFilterChange={setFilteredProducts}
          />

          {/* Reset Filters */}
          <button
            onClick={() => setFilteredProducts(items)}
            className="mt-4 btn btn-sm w-full"
          >
            Reset Filters
          </button>
        </SidebarContent>
      </Sidebar>

      {/* 🛍 Main Content */}
      <main className="flex-1 p-4">
        {filteredProducts.length === 0 ? (
          <p className="text-center mt-4">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
