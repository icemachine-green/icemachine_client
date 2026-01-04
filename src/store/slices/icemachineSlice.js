// store/slices/icemachineSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createIcemachineThunk,
  getIcemachinesByBusinessIdThunk,
  deleteIcemachineThunk,
  updateIcemachineThunk, // 1. 수정 Thunk 추가 임포트
} from "../thunks/icemachineThunk.js";

const initialState = {
  icemachinesList: [],
  listStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  listError: null,
  addStatus: "idle", // 생성/수정 공용으로 사용: 'idle' | 'loading' | 'succeeded' | 'failed'
  addError: null,
};

const icemachineSlice = createSlice({
  name: "icemachine",
  initialState,
  reducers: {
    clearIcemachineState: (state) => {
      state.icemachinesList = [];
      state.listStatus = "idle";
      state.listError = null;
      state.addStatus = "idle";
      state.addError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 제빙기 목록 조회 Thunk
      .addCase(getIcemachinesByBusinessIdThunk.pending, (state) => {
        state.listStatus = "loading";
        state.listError = null;
      })
      .addCase(getIcemachinesByBusinessIdThunk.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.icemachinesList = action.payload.data;
      })
      .addCase(getIcemachinesByBusinessIdThunk.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = action.payload || "제빙기 목록 조회 실패";
      })

      // 제빙기 생성 Thunk
      .addCase(createIcemachineThunk.pending, (state) => {
        state.addStatus = "loading";
        state.addError = null;
      })
      .addCase(createIcemachineThunk.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        if (action.payload.data) {
          state.icemachinesList.push(action.payload.data);
        }
      })
      .addCase(createIcemachineThunk.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload || "제빙기 생성 실패";
      })

      // 제빙기 삭제 Thunk
      .addCase(deleteIcemachineThunk.pending, (state) => {
        state.listStatus = "loading";
        state.listError = null;
      })
      .addCase(deleteIcemachineThunk.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.icemachinesList = state.icemachinesList.filter(
          (machine) => machine.id !== action.payload
        );
      })
      .addCase(deleteIcemachineThunk.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = action.payload || "제빙기 삭제 실패";
      })

      // 2. [추가] 제빙기 수정 Thunk (updateIcemachineThunk)
      .addCase(updateIcemachineThunk.pending, (state) => {
        state.addStatus = "loading";
        state.addError = null;
      })
      .addCase(updateIcemachineThunk.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        // 포스트맨 응답의 data 필드가 수정된 제빙기 객체임
        const updatedMachine = action.payload.data;

        if (updatedMachine) {
          // 리스트에서 기존 항목을 찾아 수정된 데이터로 교체
          const index = state.icemachinesList.findIndex(
            (m) => m.id === updatedMachine.id
          );
          if (index !== -1) {
            state.icemachinesList[index] = updatedMachine;
          }
        }
      })
      .addCase(updateIcemachineThunk.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload || "제빙기 수정 실패";
      });
  },
});

export const { clearIcemachineState } = icemachineSlice.actions;
export default icemachineSlice.reducer;
