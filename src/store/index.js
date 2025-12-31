import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import reviewsReducer from "./slices/reviewsSlice.js";
import { injectStoreInAxios } from "../api/axiosInstance.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReducer,
  },
});

injectStoreInAxios(store);
