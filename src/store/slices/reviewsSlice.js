import { createSlice } from "@reduxjs/toolkit";
import { createReview, deleteReview, getReviews } from "../thunks/reviewThunk.js";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 1. 리뷰 목록 조회 (getReviews)
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 2. 리뷰 생성 (createReview)
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.unshift(action.payload.data);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 3. 리뷰 삭제 (deleteReview)
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export default reviewsSlice.reducer;