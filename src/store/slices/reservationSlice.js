import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAvailabilityThunk,
  createReservationThunk,
  fetchMyReservationsThunk,
  cancelReservationThunk,
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

  // 정책별 소요 시간 (시간 단위)
  durations: {
    1: 1,
    2: 1,
    3: 2,
    4: 1,
    5: 1,
    6: 2,
    7: 3,
    8: 1,
    9: 2,
    10: 3,
    11: 4,
  },

  myReservations: [],
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
    // 날짜 변경 시 기존 선택 시간을 초기화하기 위한 리듀서
    resetTime: (state) => {
      state.selection.reservedDate = "";
      state.selection.serviceStartTime = "";
      state.selection.serviceEndTime = "";
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
    builder.addCase(fetchAvailabilityThunk.fulfilled, (state, action) => {
      state.disabledSlots = action.payload.data.disabled;
    });

    builder
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

    builder.addCase(fetchMyReservationsThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.myReservations = action.payload.data;
    });

    builder.addCase(cancelReservationThunk.fulfilled, (state, action) => {
      const { reservationId } = action.payload;
      const target = state.myReservations.find(
        (res) => res.id === reservationId
      );
      if (target) {
        target.status = "CANCELED";
      }
    });
  },
});

export const {
  setStep,
  updateSelection,
  resetTime, // export 추가
  setReservationTime,
  clearReservationState,
} = reservationSlice.actions;

export default reservationSlice.reducer;
