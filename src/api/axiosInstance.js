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
  // TODO: 실제 배포할 때 URL 수정 필요
  // baseURL: "http://localhost:3000", // 백엔드 기본 URL 
  baseURL: "", // 백엔드 기본 URL
  headers: {
    "Content-Type": "application/json", // 요청 규칙: json
  },
  // 크로스 도메인 요청 시 민감 정보 포함 여부 지정
  withCredentials: true, // cookie, 헤더의 authorization, etc..
});

// 모든 request를 interceptor로 가로채 토큰 만료 선 체크
// config: request가 담김
axiosInstance.interceptors.request.use(async (config) => {
  // reissue 요청은 재발급 로직을 타지 않도록 함
  const noRetry = /^\/api\/auth\/reissue$/;
  let { accessToken } = store.getState().auth;

  try {
    // accessToken이 있고, reissue 요청이 아닐 때만 실행
    if (accessToken && !noRetry.test(config.url)) {
      // 액세스 토큰 만료 확인
      const claims = jwtDecode(accessToken);
      const now = dayjs().unix();
      // 만료 5분 전일 경우 재발급
      const expTime = dayjs.unix(claims.exp).add(-5, "minute").unix();

      if (now >= expTime) {
        config._retry = true; // 재시도 플래그 (선택적)
        console.log("Access Token 만료 감지, 재발급을 시도합니다.");
        const response = await store.dispatch(reissueThunk()).unwrap();

        // ★★★★★★★★★★★★★★★★★★★★★★★★★★
        // 여기가 수정된 부분입니다.
        accessToken = response.accessToken;
        // ★★★★★★★★★★★★★★★★★★★★★★★★★★

        console.log("Access Token 재발급 성공");
      }

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  } catch (error) {
    console.log("axios interceptor에서 에러 발생:", error);
    // 여기서 에러를 반환하면 요청이 중단됩니다.
    return Promise.reject(error);
  }
});

export default axiosInstance;
