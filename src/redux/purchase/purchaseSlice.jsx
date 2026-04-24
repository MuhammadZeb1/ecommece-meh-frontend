import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Your axios instance

// ------------------- ASYNC THUNKS -------------------

// 1. Create a purchase (Checkout)
export const createPurchase = createAsyncThunk(
  "purchase/create",
  async (items, { rejectWithValue }) => {
    try {
      const response = await api.post("/purchases", { items });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Purchase failed");
    }
  }
);

// 2. Fetch Customer History
export const fetchCustomerPurchases = createAsyncThunk(
  "purchase/fetchCustomer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/purchases/customer");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch history");
    }
  }
);

// 3. Fetch Admin History
export const fetchAdminPurchases = createAsyncThunk(
  "purchase/fetchAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/purchases/admin");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch admin data");
    }
  }
);

// 4. Delete Purchase by Admin (Removes from Admin list)
export const deleteAdminPurchase = createAsyncThunk(
  "purchase/deleteAdmin",
  async (purchaseId, { rejectWithValue }) => {
    try {
      await api.delete(`/purchases/admin/${purchaseId}`);
      return purchaseId; // Return ID to filter state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// 5. Delete Purchase by Customer (Removes from personal list)
export const deleteCustomerPurchase = createAsyncThunk(
  "purchase/deleteCustomer",
  async (purchaseId, { rejectWithValue }) => {
    try {
      await api.delete(`/purchases/customer/${purchaseId}`);
      return purchaseId; // Return ID to filter state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// ------------------- SLICE -------------------

const purchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    customerPurchases: [],
    adminPurchases: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Clear error state if needed
    clearPurchaseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending State for all fetches
      .addCase(fetchCustomerPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Fetch Success
      .addCase(fetchCustomerPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.customerPurchases = action.payload;
      })
      .addCase(fetchAdminPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.adminPurchases = action.payload;
      })

      // ✅ Delete Success: Admin
      .addCase(deleteAdminPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.adminPurchases = state.adminPurchases.filter(
          (item) => item._id !== action.payload
        );
      })

      // ✅ Delete Success: Customer
      .addCase(deleteCustomerPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.customerPurchases = state.customerPurchases.filter(
          (item) => item._id !== action.payload
        );
      })

      // Global Rejected Matcher
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearPurchaseError } = purchaseSlice.actions;
export default purchaseSlice.reducer;