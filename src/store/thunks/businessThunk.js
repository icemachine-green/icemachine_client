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

/**
 * 사용자의 모든 매장 목록 조회
 */
export const getBusinessesThunk = createAsyncThunk(
  "business/getBusinesses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/businesses");
      return response.data;
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 특정 매장의 상세 정보 조회
 */
export const getBusinessDetailThunk = createAsyncThunk(
  "business/getBusinessDetail",
  async (businessId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/businesses/${businessId}`);
      return response.data;
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 매장 정보 수정
 * @param {{ businessId: string, businessData: object }} { businessId, businessData }
 * @returns 업데이트된 매장 데이터
 */
export const updateBusinessThunk = createAsyncThunk(
  "business/updateBusiness",
  async ({ businessId, businessData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/businesses/${businessId}`,
        businessData
      );
      return response.data;
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 매장 삭제
 * @param {string} businessId
 * @returns 삭제 성공 메시지 또는 상태
 */
export const deleteBusinessThunk = createAsyncThunk(
  "business/deleteBusiness",
  async (businessId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/businesses/${businessId}`);
      return businessId; // 삭제된 businessId를 반환하여 상태 업데이트에 활용
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

