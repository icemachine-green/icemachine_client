import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const createBusinessThunk = createAsyncThunk(
  "business/createBusiness",
  async ({ businessData, iceMachineData }, { rejectWithValue }) => {
    try {
      // 🚩 백엔드 Sequelize 모델 규격: brandName, modelName, sizeType
      const mappedIceMachine = {
        brandName:
          iceMachineData.brand || iceMachineData.brandName || "호시자키",
        modelName:
          iceMachineData.model || iceMachineData.modelName || "모델명 모름",
        sizeType: iceMachineData.size || iceMachineData.sizeType || "소형",
      };

      const payload = {
        ...businessData,
        iceMachines: [mappedIceMachine],
      };

      const response = await axiosInstance.post("/api/businesses", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getBusinessesThunk = createAsyncThunk(
  "business/getBusinesses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/businesses");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getBusinessDetailThunk = createAsyncThunk(
  "business/getBusinessDetail",
  async (businessId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/businesses/${businessId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

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
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteBusinessThunk = createAsyncThunk(
  "business/deleteBusiness",
  async (businessId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/businesses/${businessId}`);
      return businessId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
