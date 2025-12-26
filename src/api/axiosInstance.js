import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { reissueThunk } from "../store/thunks/authThunk.js";

// store 저장용 변수
let store = null;

// store 주입용 함수
export function injectStoreInAxios(_store) {
  store = _store;
}

// axios instance
const axiosInstance = axios.create({
  baseURL: "", // 기본 URL (공통 도메인)
  headers: {
    "Content-Type": "application/json", // 요청 규칙: json
  },
  // 크로스 도메인 요청 시 민감 정보 포함 여부 지정
  withCredentials: true, // cookie, 헤더의 authorization, etc..
});

// 모든 request를 interceptor로 가로채 토큰 만료 선 체크
// config: request가 담김
axiosInstance.interceptors.request.use(async (config) => {
  const noRetry = /^\/api\/auth\/reissue$/;
  let { accessToken } = store.getState().auth;

  try {
    if (accessToken && !noRetry.test(config.url)) {
      // 액세스 토큰 만료 확인
      const claims = jwtDecode(accessToken);
      const now = dayjs().unix();
      const expTime = dayjs.unix(claims.exp).add(-5, "minute").unix();

      if (now >= expTime) {
        config._retry = true;
        const response = await store.dispatch(reissueThunk()).unwrap();
        accessToken = response.data.accessToken;
        console.log("액세스 토큰 재발급");
      }

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  } catch (error) {
    console.log("axios interceptor", error);
  }
});

export default axiosInstance;
