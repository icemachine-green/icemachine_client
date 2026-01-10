/**
 * @file servicePolicyThunk.js
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchServicePoliciesThunk = createAsyncThunk(
  "servicePolicy/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/service-policies");

      // 서버 응답 구조가 { data: [...] } 인지 그냥 [...] 인지 확인 후 반환
      const finalData = response.data.data || response.data;

      return finalData;
    } catch (error) {
      console.error("❌ [Thunk] API 호출 실패:", error);
      return rejectWithValue(error.response?.data || "정책 로드 실패");
    }
  }
);
