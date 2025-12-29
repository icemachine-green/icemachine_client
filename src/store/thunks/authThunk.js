import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

/**
 * 카카오 로그인 시작
 * 실제 로그인 처리는 서버 + 카카오에서 수행
 * 프론트는 authorize 엔드포인트로 이동만 한다
 */
export const startKakaoLoginThunk = createAsyncThunk(
  "auth/startKakaoLogin",
  async () => {
    window.location.href = "http://localhost:3000/api/auth/kakao/authorize";
  }
);

/**
 * 소셜 회원가입 (추가 정보 입력)
 * provider, socialId는 callback 이후 서버 or store에 이미 있다고 가정
 */
export const socialSignupThunk = createAsyncThunk(
  "auth/socialSignup",
  async (args, { rejectWithValue }) => {
    try {
      const url = "/api/auth/social-signup";

      // 사용자에게 입력받는 값만 전달
      const { name, email, phoneNumber, provider, socialId } = args;

      const response = await axiosInstance.post(url, {
        name,
        email,
        phoneNumber,
        provider,
        socialId,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// 토큰 재발급
export const reissueThunk = createAsyncThunk(
  "auth/reissueThunk",
  async (_, { rejectWithValue }) => {
    try {
      const url = "/api/auth/reissue";
      const response = await axiosInstance.post(url);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
