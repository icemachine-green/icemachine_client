import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance.js";

/**
 * 내 정보 조회
 */
export const getMyProfile = createAsyncThunk(
  "users/getMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/users/me");
      return res.data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);

/**
 * 내 정보 수정
 */
export const updateMyProfile = createAsyncThunk(
  "users/updateMyProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/users/me", payload);
      return res.data.data;
    } catch (e) {
      return rejectWithValue(e.response?.data);
    }
  }
);

/**
 * 내 정보-이메일 수정시 이메일 중복 체크
 */
export const checkEmailDuplicate = createAsyncThunk(
  "users/checkEmailDuplicate",
  async (email) => {
    const res = await api.get("/api/users/check-email", {
      params: { email },
    });
    return res.data.data; // true | false
  }
);

/**
 * 회원 탈퇴 (soft delete)
 */
export const withdrawUserThunk = createAsyncThunk(
  "users/withdraw",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.delete("/api/users/me");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);