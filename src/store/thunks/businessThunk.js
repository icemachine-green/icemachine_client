// store/thunks/businessThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

/**
 * 매장 및 제빙기 동시 등록
 * @param {{ businessData: object, iceMachineData: object }} { businessData, iceMachineData }
 * @returns 등록된 매장 데이터
 */
export const createBusinessThunk = createAsyncThunk(
  "business/createBusiness",
  async ({ businessData, iceMachineData }, { rejectWithValue }) => {
    try {
      // API가 요구하는 형식으로 페이로드를 조합합니다.
      const payload = {
        ...businessData,
        iceMachines: [iceMachineData],
      };

      const response = await axiosInstance.post(
        "/api/businesses",
        payload // 조합된 페이로드 전송
      );
      return response.data; // API에서 반환한 등록된 매장 정보
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);
