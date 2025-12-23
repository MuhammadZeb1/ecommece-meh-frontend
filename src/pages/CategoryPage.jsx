import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/products/productsSlice";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products based on category
  const filteredProducts = items.filter(
    (p) => p.category?.name.toLowerCase() === category.toLowerCase()
  );

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (filteredProducts.length === 0)
    return <p className="text-center mt-4">No products found in {category}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {filteredProducts.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
};

export default CategoryPage;
