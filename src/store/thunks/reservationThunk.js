import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

/**
 * 특정 기간 및 서비스 정책에 따른 예약 불가능 시간 조회
 */
export const fetchAvailabilityThunk = createAsyncThunk(
  "reservation/fetchAvailability",
  async ({ startDate, endDate, servicePolicyId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/api/reservations/availability",
        {
          params: { startDate, endDate, servicePolicyId },
        }
      );
      return response.data; // { code, msg, data: { range, disabled: [...] } }
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * 예약 생성 (기존 유지)
 */
export const createReservationThunk = createAsyncThunk(
  "reservation/createReservation",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/reservations", args);
      return response.data;
    } catch (error) {
      if (error.response) return rejectWithValue(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);
