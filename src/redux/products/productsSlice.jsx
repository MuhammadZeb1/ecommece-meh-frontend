import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsAPI,
  createProductAPI,
  deleteProductAPI,
  updateProductAPI,
} from "../products/productService";

// READ
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, thunkAPI) => {
    try {
      return await getProductsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// CREATE
export const addProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await createProductAPI(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// DELETE
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      await deleteProductAPI(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// UPDATE
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await updateProductAPI({ id, formData });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // READ
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      // CREATE
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload.product);
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (p) => p._id !== action.payload
        );
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p._id === action.payload.product._id
        );
        state.items[index] = action.payload.product;
      });
  },
});

export default productsSlice.reducer;
