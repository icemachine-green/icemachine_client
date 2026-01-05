/**
 * @file store/slices/reservationSlice.js
 */
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAvailabilityThunk,
  createReservationThunk,
  fetchMyReservationsThunk, // 추가된 Thunk
  cancelReservationThunk, // 추가된 Thunk
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

  // 내 예약 내역 관리용 (추가)
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
    // 1. 가용성 조회 (기존 유지)
    builder.addCase(fetchAvailabilityThunk.fulfilled, (state, action) => {
      state.disabledSlots = action.payload.data.disabled;
    });

    // 2. 예약 생성 (기존 유지)
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

    // 3. 내 예약 목록 조회 (신규 추가)
    builder
      .addCase(fetchMyReservationsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyReservationsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myReservations = action.payload.data;
      })
      .addCase(fetchMyReservationsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // 4. 예약 취소 (신규 추가)
    builder
      .addCase(cancelReservationThunk.fulfilled, (state, action) => {
        const { reservationId } = action.payload;
        // 목록 내 해당 예약의 상태를 즉시 'CANCELED'로 업데이트 (UX 개선)
        const target = state.myReservations.find(
          (res) => res.id === reservationId
        );
        if (target) {
          target.status = "CANCELED";
        }
      })
      .addCase(cancelReservationThunk.rejected, (state, action) => {
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
