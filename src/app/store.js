import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/products/productsSlice";
import authReducer from "../redux/auth/authSlice";



export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
   
    
  },
});
