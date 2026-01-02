// store/slices/icemachineSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createIcemachineThunk, getIcemachinesByBusinessIdThunk, deleteIcemachineThunk } from "../thunks/icemachineThunk.js";

const initialState = {
  icemachinesList: [],
  listStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  listError: null,
  addStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
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
        state.icemachinesList = action.payload.data; // payload.data에 목록이 있다고 가정
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
        // 새로 생성된 제빙기를 목록에 반영합니다.
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
        state.listStatus = "loading"; // 삭제 중에도 목록 상태를 로딩으로 표시
        state.listError = null;
      })
      .addCase(deleteIcemachineThunk.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        // 삭제된 제빙기를 목록에서 제거
        state.icemachinesList = state.icemachinesList.filter(
          (machine) => machine.id !== action.payload
        );
      })
      .addCase(deleteIcemachineThunk.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = action.payload || "제빙기 삭제 실패";
      });
  },
});

export const { clearIcemachineState } = icemachineSlice.actions;
export default icemachineSlice.reducer;
