import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const getIcemachinesByBusinessIdThunk = createAsyncThunk(
  "icemachine/getIcemachinesByBusinessId",
  async (businessId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/icemachines?businessId=${businessId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createIcemachineThunk = createAsyncThunk(
  "icemachine/createIcemachine",
  async ({ businessId, icemachineData }, { rejectWithValue }) => {
    try {
      // 🚩 백엔드 Sequelize 모델 규격: brandName, modelName, sizeType
      const mappedData = {
        businessId: parseInt(businessId),
        brandName:
          icemachineData.brand || icemachineData.brandName || "호시자키",
        modelName:
          icemachineData.model || icemachineData.modelName || "모델명 모름",
        sizeType: icemachineData.size || icemachineData.sizeType || "소형",
      };
      const response = await axiosInstance.post("/api/icemachines", mappedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateIcemachineThunk = createAsyncThunk(
  "icemachine/updateIcemachine",
  async ({ iceMachineId, icemachineData }, { rejectWithValue }) => {
    try {
      const mappedData = {
        brandName: icemachineData.brand || icemachineData.brandName,
        modelName: icemachineData.model || icemachineData.modelName,
        sizeType: icemachineData.size || icemachineData.sizeType,
      };
      const response = await axiosInstance.put(
        `/api/icemachines/${iceMachineId}`,
        mappedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteIcemachineThunk = createAsyncThunk(
  "icemachine/deleteIcemachine",
  async (iceMachineId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/icemachines/${iceMachineId}`);
      return iceMachineId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
