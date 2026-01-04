// src/store/thunks/businessThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

/**
 * 매장 및 제빙기 동시 등록
 */
export const createBusinessThunk = createAsyncThunk(
  "business/createBusiness",
  async ({ businessData, iceMachineData }, { rejectWithValue }) => {
    try {
      const mappedIceMachine = {
        brand: iceMachineData.modelType || iceMachineData.brand,
        model: iceMachineData.modelName || iceMachineData.model,
        size: iceMachineData.sizeType || iceMachineData.size,
      };

      const payload = {
        ...businessData,
        iceMachines: [mappedIceMachine],
      };

      const response = await axiosInstance.post("/api/businesses", payload);
      return response.data;
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
 * 매장 삭제 (이 부분이 Slice에서 에러가 났던 부분입니다)
 */
export const deleteBusinessThunk = createAsyncThunk(
  "business/deleteBusiness",
  async (businessId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/businesses/${businessId}`);
      return businessId;
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);
