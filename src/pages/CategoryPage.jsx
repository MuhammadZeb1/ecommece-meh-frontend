import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../redux/products/productsSlice";
import { motion, AnimatePresence } from "framer-motion";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const { category } = useParams(); // This will now represent the Dosage Form (e.g., 'tablet')

  const [baseProducts, setBaseProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ✅ Updated Filter Logic for Dosage Form
  useEffect(() => {
    const filtered = category
      ? items.filter(
          (p) => p.dosageForm?.toLowerCase() === category.toLowerCase()
        )
      : items;

    setBaseProducts(filtered);
    setFilteredProducts(filtered); 
  }, [items, category]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
       <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
       <p className="animate-pulse text-emerald-600 font-medium">Filtering Pharmacy Inventory...</p>
    </div>
  );

  return (
    <SidebarProvider>
      <motion.div
        className="flex min-h-screen w-full bg-slate-50/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Pass dosage-specific products to the sidebar for further sub-filtering */}
        <AppSidebar products={baseProducts} onFilterChange={setFilteredProducts} />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-white shadow-sm transition-all border border-slate-200" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900 capitalize">
                  {category ? `${category}s` : "All Medicines"}
                </h1>
                <p className="text-sm text-slate-500">
                  Found {filteredProducts.length} medicines in this form
                </p>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="text-4xl mb-2">💊</div>
              <p className="text-slate-400 font-medium text-center">
                No medicines found for the dosage form: <span className="font-bold">"{category}"</span>
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </motion.div>
    </SidebarProvider>
  );
};

export default CategoryPage;