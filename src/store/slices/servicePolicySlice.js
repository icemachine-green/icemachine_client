import { createSlice } from "@reduxjs/toolkit";
import { fetchServicePoliciesThunk } from "../thunks/servicePolicyThunk";

const servicePolicySlice = createSlice({
  name: "servicePolicy",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePoliciesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicePoliciesThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchServicePoliciesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default servicePolicySlice.reducer;
