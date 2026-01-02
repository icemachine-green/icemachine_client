// store/slices/businessSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createBusinessThunk, getBusinessesThunk, getBusinessDetailThunk, updateBusinessThunk, deleteBusinessThunk } from "../thunks/businessThunk.js";

const initialState = {
  // 매장 생성 관련 상태
  business: null,
  createStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  createError: null,
  
  // 매장 목록 조회 관련 상태
  businessesList: [],
  listStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  listError: null,

  // 특정 매장 상세 조회 관련 상태
  businessDetail: null,
  detailStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  detailError: null,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearBusinessState: (state) => {
      state.business = null;
      state.createStatus = "idle";
      state.createError = null;
      state.businessDetail = null; // 상세 정보도 초기화
      state.detailStatus = "idle";
      state.detailError = null;
      // 목록 상태는 초기화하지 않거나 필요에 따라 별도 리듀서 작성
    },
  },
  extraReducers: (builder) => {
    builder
      // 매장 생성 Thunk
      .addCase(createBusinessThunk.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createBusinessThunk.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.business = action.payload;
      })
      .addCase(createBusinessThunk.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload || "매장 등록 실패";
      })
      // 매장 목록 조회 Thunk
      .addCase(getBusinessesThunk.pending, (state) => {
        state.listStatus = "loading";
        state.listError = null;
      })
      .addCase(getBusinessesThunk.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.businessesList = action.payload.data; // payload.data에 목록이 있다고 가정
      })
      .addCase(getBusinessesThunk.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = action.payload || "매장 목록 조회 실패";
      })
      // 매장 상세 조회 Thunk
      .addCase(getBusinessDetailThunk.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
      })
      .addCase(getBusinessDetailThunk.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.businessDetail = action.payload.data; // payload.data에 상세 정보가 있다고 가정
      })
      .addCase(getBusinessDetailThunk.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload || "매장 상세 정보 조회 실패";
      })
      // 매장 정보 수정 Thunk
      .addCase(updateBusinessThunk.pending, (state) => {
        state.detailStatus = "loading"; // 수정 중에도 로딩 상태로 표시
        state.detailError = null;
      })
      .addCase(updateBusinessThunk.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.businessDetail = action.payload.data; // 수정된 매장 정보로 업데이트
      })
      .addCase(updateBusinessThunk.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload || "매장 정보 수정 실패";
      })
      // 매장 삭제 Thunk
      .addCase(deleteBusinessThunk.pending, (state) => {
        state.detailStatus = "loading"; // 삭제 중에도 로딩 상태로 표시
        state.detailError = null;
      })
      .addCase(deleteBusinessThunk.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.businessDetail = null; // 매장 상세 정보 초기화
        // 목록에서도 해당 매장 제거 (선택 사항, MyStores에서 다시 불러올 수 있음)
        state.businessesList = state.businessesList.filter(
          (business) => business.id !== action.payload
        );
      })
      .addCase(deleteBusinessThunk.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload || "매장 삭제 실패";
      });
  },
});

export const { clearBusinessState } = businessSlice.actions;
export default businessSlice.reducer;
