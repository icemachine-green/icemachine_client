import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

/**
 * 리뷰 생성 (별점, 내용, 사진 포함)
 * FormData를 사용하여 multipart/form-data로 전송합니다.
 * POST /api/reviews
 */
export const createReview = createAsyncThunk(
  "reviews/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * 리뷰 목록 조회 (최신순)
 * GET /api/reviews
 */
export const getReviews = createAsyncThunk(
  "reviews/get",
  async ({ sort = "latest"}, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/reviews?sort=${sort}`);
      return response.data.data; // 리뷰 배열
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * 리뷰 삭제
 * DELETE /api/reviews/:reviewId
 */
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (reviewId, { rejectWithValue }) => {
    try {
      // reviewId를 인자로 받아 해당 리뷰를 삭제 요청합니다.
      await api.delete(`/api/reviews/${reviewId}`);
      return reviewId; // 성공 시, 삭제된 리뷰의 ID를 반환하여 slice에서 처리
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
