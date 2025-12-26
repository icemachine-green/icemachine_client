import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startKakaoLogin: (state) => {
      state.isLoading = true;

      // 실제 로그인 로직은 서버에서 처리
      // 프론트는 그냥 authorize 엔드포인트로 이동만 한다
      window.location.href = "http://localhost:3000/api/auth/kakao/authorize";
    },
  },
});

export const { startKakaoLogin } = authSlice.actions;
export default authSlice.reducer;
