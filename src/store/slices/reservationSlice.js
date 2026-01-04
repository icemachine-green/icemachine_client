import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAvailabilityThunk,
  createReservationThunk,
} from "../thunks/reservationThunk.js";

const initialState = {
  status: "idle",
  currentStep: 1,

  selection: {
    businessId: null,
    iceMachineId: null,
    servicePolicyId: null,
    reservedDate: "",
    serviceStartTime: "",
    serviceEndTime: "",
    note: "",
  },

  // API에서 받아온 예약 불가 시간들
  disabledSlots: [],

  durations: { 1: 1, 2: 1, 5: 2 }, // 정책별 소요 시간
  lastReservation: null,
  error: null,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateSelection: (state, action) => {
      state.selection = { ...state.selection, ...action.payload };
    },
    setReservationTime: (state, action) => {
      const { date, time } = action.payload;
      const duration = state.durations[state.selection.servicePolicyId] || 1;
      const startHour = parseInt(time.split(":")[0]);

      state.selection.reservedDate = date;
      state.selection.serviceStartTime = `${date} ${time}:00`;
      state.selection.serviceEndTime = `${date} ${String(
        startHour + duration
      ).padStart(2, "0")}:00:00`;
    },
    clearReservationState: (state) => initialState,
  },
  extraReducers: (builder) => {
    // 가용성 조회
    builder
      .addCase(fetchAvailabilityThunk.fulfilled, (state, action) => {
        state.disabledSlots = action.payload.data.disabled; // [{date, time, reason}, ...]
      })
      // 예약 생성
      .addCase(createReservationThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReservationThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastReservation = action.payload.data;
      })
      .addCase(createReservationThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setStep,
  updateSelection,
  setReservationTime,
  clearReservationState,
} = reservationSlice.actions;
export default reservationSlice.reducer;
