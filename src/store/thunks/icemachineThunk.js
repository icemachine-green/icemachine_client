// store/thunks/icemachineThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

/**
 * 새로운 제빙기를 매장에 등록
 * @param {{ businessId: string, icemachineData: object }} { businessId, icemachineData }
 * @returns 등록된 제빙기 데이터
 */
export const createIcemachineThunk = createAsyncThunk(
  "icemachine/createIcemachine",
  async ({ businessId, icemachineData }, { rejectWithValue }) => {
    try {
      const payload = {
        ...icemachineData,
        businessId: businessId, // 제빙기 데이터에 businessId 포함
      };
      const response = await axiosInstance.post("/api/icemachines", payload);
      return response.data;
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 특정 매장의 제빙기 목록 조회
 * @param {string} businessId
 * @returns 제빙기 목록 데이터
 */
export const getIcemachinesByBusinessIdThunk = createAsyncThunk(
  "icemachine/getIcemachinesByBusinessId",
  async (businessId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/icemachines?businessId=${businessId}`
      );
      return response.data;
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 제빙기 삭제
 * @param {string} icemachineId
 * @returns 삭제 성공 메시지 또는 상태 (삭제된 icemachineId 반환)
 */
export const deleteIcemachineThunk = createAsyncThunk(
  "icemachine/deleteIcemachine",
  async (icemachineId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/icemachines/${icemachineId}`);
      return icemachineId; // 삭제된 icemachineId를 반환하여 상태 업데이트에 활용
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

