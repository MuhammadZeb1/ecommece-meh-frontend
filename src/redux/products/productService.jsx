import api from "../../services/api";

// Get all products
export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

// Get single product
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// Create product
export const createProduct = async (formData) => {
  const res = await api.post("/products/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

