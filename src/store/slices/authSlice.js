import { createSlice } from "@reduxjs/toolkit";
import {
  startKakaoLoginThunk,
  socialSignupThunk,
} from "../thunks/authThunk.js";

const initialState = {
  accessToken: null,
  user: null,

  // 소셜 로그인 임시 정보
  provider: null,
  socialId: null,

  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * callback 페이지에서 소셜 정보 저장용
     */
    setSocialAuthInfo: (state, action) => {
      const { provider, socialId } = action.payload;
      state.provider = provider;
      state.socialId = socialId;
    },

    clearAuthState: (state) => {
      state.accessToken = null;
      state.user = null;
      state.provider = null;
      state.socialId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 카카오 로그인 시작
      .addCase(startKakaoLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startKakaoLoginThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(startKakaoLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 소셜 회원가입
      .addCase(socialSignupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(socialSignupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.accessToken = action.payload.accessToken || null;
      })
      .addCase(socialSignupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSocialAuthInfo, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
