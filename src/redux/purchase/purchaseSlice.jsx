import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// ------------------- ASYNC THUNKS -------------------

export const createPurchase = createAsyncThunk(
  "purchase/create",
  async (items, { rejectWithValue }) => {
    try {
      // items should be [{ productId, quantity }, ...]
      const response = await api.post("/purchases/customer", { items });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Purchase failed");
    }
  }
);

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

export const fetchAdminAnalytics = createAsyncThunk(
  "purchase/fetchAnalytics",
  async (period, { rejectWithValue }) => {
    try {
      const response = await api.get(`/purchases/admin/analytics?period=${period}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch analytics");
    }
  }
);

export const deleteAdminPurchase = createAsyncThunk(
  "purchase/deleteAdmin",
  async (purchaseId, { rejectWithValue }) => {
    try {
      await api.delete(`/purchases/admin/${purchaseId}`);
      return purchaseId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

export const deleteCustomerPurchase = createAsyncThunk(
  "purchase/deleteCustomer",
  async (purchaseId, { rejectWithValue }) => {
    try {
      await api.delete(`/purchases/customer/${purchaseId}`);
      return purchaseId;
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
    analytics: {
      summary: { totalSales: 0, totalProfit: 0, totalLoss: 0, status: "Neutral" },
      bestSellingProducts: [],
      totalTransactions: 0,
    },
    loading: false,
    success: false, // Added to track successful checkout
    error: null,
  },
  reducers: {
    resetPurchaseStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Purchase Success
      .addCase(createPurchase.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      // Fetching Logic
      .addCase(fetchCustomerPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.customerPurchases = action.payload;
      })
      .addCase(fetchAdminPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.adminPurchases = action.payload;
      })
      .addCase(fetchAdminAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      // Deletion Logic
      .addCase(deleteAdminPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.adminPurchases = state.adminPurchases.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteCustomerPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.customerPurchases = state.customerPurchases.filter(
          (item) => item._id !== action.payload
        );
      })

      // Matchers for global Pending/Rejected states
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        }
      );
  },
});

export const { resetPurchaseStatus } = purchaseSlice.actions;
export default purchaseSlice.reducer;