import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import reviewsReducer from "./slices/reviewsSlice.js";
import businessReducer from "./slices/businessSlice.js";
import userReducer from "./slices/userSlice.js";
import reservationReducer from "./slices/reservationSlice";
// 1. icemachineSlice 임포트 추가
import icemachineReducer from "./slices/icemachineSlice.js";
import { injectStoreInAxios } from "../api/axiosInstance.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewsReducer,
    business: businessReducer,
    user: userReducer,
    reservation: reservationReducer,
    // 2. icemachine 리듀서 등록
    icemachine: icemachineReducer,
  },
});

injectStoreInAxios(store);
