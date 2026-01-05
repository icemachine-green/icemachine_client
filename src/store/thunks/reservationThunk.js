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

// 내 예약 목록 조회 (필터 포함)
export const fetchMyReservationsThunk = createAsyncThunk(
  "reservation/fetchMyReservations",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/reservations/by-user/${userId}`,
        {
          params: { status: status !== "ALL" ? status : undefined },
        }
      );
      return response.data; // { code: "00", msg: "정상 처리", data: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 예약 취소
export const cancelReservationThunk = createAsyncThunk(
  "reservation/cancelReservation",
  async (reservationId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/reservations/cancel/${reservationId}`
      );
      return { reservationId, ...response.data };
    } catch (error) {
      // 백엔드에서 던지는 "24시간 전 취소 불가" 에러 메시지를 가로챔
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
