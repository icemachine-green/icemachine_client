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
  disabledSlots: [],
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
    resetTime: (state) => {
      state.selection.reservedDate = "";
      state.selection.serviceStartTime = "";
      state.selection.serviceEndTime = "";
    },
    setReservationTime: (state, action) => {
      const { date, time, standardDuration } = action.payload;
      const duration = standardDuration || 60;
      const [startHour, startMin] = time.split(":").map(Number);
      const startTime = new Date(date.replace(/-/g, "/"));
      startTime.setHours(startHour, startMin, 0);
      const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

      const formatDateTime = (dt) => {
        const pad = (n) => String(n).padStart(2, "0");
        return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(
          dt.getDate()
        )} ${pad(dt.getHours())}:${pad(dt.getMinutes())}:00`;
      };

      state.selection.reservedDate = date;
      state.selection.serviceStartTime = formatDateTime(startTime);
      state.selection.serviceEndTime = formatDateTime(endTime);
    },
    clearReservationState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAvailabilityThunk.fulfilled, (state, action) => {
      state.disabledSlots = action.payload.data.disabled || action.payload.data;
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
      if (target) target.status = "CANCELED";
    });
  },
});

export const {
  setStep,
  updateSelection,
  resetTime,
  setReservationTime,
  clearReservationState,
} = reservationSlice.actions;
export default reservationSlice.reducer;
