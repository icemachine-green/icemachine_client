import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// 1. 예약 가능 슬롯 조회
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. 예약 생성
export const createReservationThunk = createAsyncThunk(
  "reservation/create",
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/reservations",
        reservationData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. 내 예약 목록
export const fetchMyReservationsThunk = createAsyncThunk(
  "reservation/fetchMy",
  async ({ userId, status }, { rejectWithValue }) => {
    //  객체 구조 분해 할당으로 상태값을 같이 들고옴.
    try {
      const queryString = status ? `?status=${status}` : "";
      const response = await axiosInstance.get(
        `/api/reservations/by-user/${userId}${queryString}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 4. 예약 취소
export const cancelReservationThunk = createAsyncThunk(
  "reservation/cancel",
  async (reservationId, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/api/reservations/cancel/${reservationId}`);
      return { reservationId };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
