import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import reviewsReducer from "./slices/reviewsSlice.js";
import businessReducer from "./slices/businessSlice.js";
import userReducer from "./slices/userSlice.js";
import icemachineReducer from "./slices/icemachineSlice.js";
import { injectStoreInAxios } from "../api/axiosInstance.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReducer,
    business: businessReducer,
  },
});

injectStoreInAxios(store);
