// store/slices/businessSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createBusinessThunk } from "../thunks/businessThunk.js";

const initialState = {
  business: null, // 등록된 매장 데이터
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearBusinessState: (state) => {
      state.business = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBusinessThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createBusinessThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.business = action.payload;
      })
      .addCase(createBusinessThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "매장 등록 실패";
      });
  },
});

export const { clearBusinessState } = businessSlice.actions;
export default businessSlice.reducer;
