import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import reviewsReducer from "./slices/reviewsSlice.js";
import businessReducer from "./slices/businessSlice.js";
import userReducer from "./slices/userSlice.js";
import reservationReducer from "./slices/reservationSlice";
import icemachineReducer from "./slices/icemachineSlice.js";
import servicePolicyReducer from "./slices/servicePolicySlice.js";
import { injectStoreInAxios } from "../api/axiosInstance.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReducer,
    business: businessReducer,
    user: userReducer,
    reservation: reservationReducer,
    icemachine: icemachineReducer,
    servicePolicy: servicePolicyReducer,
  },
});

injectStoreInAxios(store);
