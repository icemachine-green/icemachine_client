import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile, updateMyProfile, withdrawUserThunk } from "../thunks/userThunk.js";

const initialState = {
  me: null,
  loading: false,
  withdrawStatus: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      state.me = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.me = action.payload;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.me = action.payload;
      });
    builder
      .addCase(withdrawUserThunk.pending, (state) => {
        state.withdrawStatus = "loading";
      })
      .addCase(withdrawUserThunk.fulfilled, (state) => {
        state.withdrawStatus = "succeeded";
        state.me = null;
      })
      .addCase(withdrawUserThunk.rejected, (state, action) => {
        state.withdrawStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
