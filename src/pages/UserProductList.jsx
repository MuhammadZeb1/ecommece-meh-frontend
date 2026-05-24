import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../redux/products/productsSlice";
import { motion, AnimatePresence } from "framer-motion";
import UserCardProduct from "@/components/UserCardProduct";

const UserProductList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const { category } = useParams();

  const [baseProducts, setBaseProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filtered = category
      ? items.filter(
          (p) => p.dosageForm?.toLowerCase() === category.toLowerCase()
        )
      : items;

    setBaseProducts(filtered);
    setFilteredProducts(filtered); 
  }, [items, category]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-600 font-medium">Verifying Pharmacy Inventory...</p>
      </div>
    );

  return (
    <SidebarProvider>
      <motion.div
        className="flex min-h-screen w-full bg-slate-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AppSidebar products={baseProducts} onFilterChange={setFilteredProducts} />

        <main className="flex-1 p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="bg-white border shadow-sm hover:bg-blue-50 transition-colors" />
              <div>
                <h1 className="text-3xl font-bold text-slate-800 capitalize tracking-tight">
                  {category ? category : "All Medications"}
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Showing {filteredProducts.length} pharmaceutical items
                </p>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed">
              <span className="text-5xl mb-4 text-slate-200">🔍</span>
              <p className="text-slate-400 font-medium text-lg">
                No medications found in this category.
              </p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.05 },
                },
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UserCardProduct product={product} />
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

export default UserProductList;