import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

// 1. 목록 조회
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

// 2. 추가
export const createIcemachineThunk = createAsyncThunk(
  "icemachine/createIcemachine",
  async ({ businessId, icemachineData }, { rejectWithValue }) => {
    try {
      // 컴포넌트에서 어떤 필드명을 쓰든 서버 규격에 맞춰 매핑
      const mappedData = {
        businessId: parseInt(businessId),
        brand: icemachineData.brand || icemachineData.modelType || "모름",
        model:
          icemachineData.model || icemachineData.modelName || "모델명 없음",
        size: icemachineData.size || icemachineData.sizeType || "모름",
      };

      const response = await axiosInstance.post("/api/icemachines", mappedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. 삭제
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

// 4. 수정
export const updateIcemachineThunk = createAsyncThunk(
  "icemachine/updateIcemachine",
  async ({ iceMachineId, icemachineData }, { rejectWithValue }) => {
    try {
      // 수정 시에도 서버가 인식할 수 있는 brand, model, size로 확실히 변환
      const mappedData = {
        brand: icemachineData.brand || icemachineData.modelType,
        model: icemachineData.model || icemachineData.modelName,
        size: icemachineData.size || icemachineData.sizeType,
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
