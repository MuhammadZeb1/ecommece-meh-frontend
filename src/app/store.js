import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/productsSlice";


export const store = configureStore({
  reducer: {
     products: productsReducer,
  },
});
