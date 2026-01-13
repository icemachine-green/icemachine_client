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
  baseURL: import.meta.env.VITE_SERVER_URL, // 백엔드 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * 모든 request를 interceptor로 가로채 토큰 만료 및 유효성 체크
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    // 1. 재발급(reissue) 요청은 인터셉터 로직을 타지 않도록 제외
    const isReissueRequest = /^\/api\/auth\/reissue$/.test(config.url);
    if (isReissueRequest) return config;

    // 2. 현재 스토어에서 토큰 가져오기
    let { accessToken } = store.getState().auth;

    // 3. 토큰 유효성 검사 (null, undefined, 혹은 문자열 "undefined" 방어)
    if (!accessToken || accessToken === "undefined") {
      console.warn(
        "[Axios] Access Token이 없거나 유효하지 않아 헤더를 설정하지 않습니다."
      );
      return config;
    }

    try {
      // 4. 액세스 토큰 만료 확인 및 재발급 로직
      const claims = jwtDecode(accessToken);
      const now = dayjs().unix();

      // 만료 5분 전(300초)일 경우 재발급 시도
      const expTime = dayjs.unix(claims.exp).subtract(5, "minute").unix();

      if (now >= expTime) {
        console.log("[Axios] Access Token 만료 예정 - 재발급 시도 중...");

        // reissueThunk 실행 및 새 토큰 확보
        const response = await store.dispatch(reissueThunk()).unwrap();
        accessToken = response.accessToken;

        console.log("[Axios] Access Token 재발급 완료");
      }

      // 5. 최종 확인된 토큰을 헤더에 삽입
      if (accessToken && accessToken !== "undefined") {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    } catch (error) {
      // jwtDecode 실패나 reissue 실패 시 에러 처리
      console.error("[Axios Interceptor] 토큰 처리 중 오류:", error);

      // 토큰이 손상된 경우(malformed 등) 헤더 없이 요청을 보낼지,
      // 아니면 요청을 중단(reject)할지 결정할 수 있습니다.
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
// // -----------------------------
// // 기존 axios 인터셉터
// // -----------------------------
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import dayjs from "dayjs";
// import { reissueThunk } from "../store/thunks/authThunk.js";

// // store 저장용 변수
// let store = null;

// // store 주입용 함수
// export function injectStoreInAxios(_store) {
//   store = _store;
// }

// // axios instance
// const axiosInstance = axios.create({
//   // TODO: 실제 배포할 때 URL 수정 필요
//   // baseURL: "http://localhost:3000", // 백엔드 기본 URL
//   baseURL: "", // 백엔드 기본 URL
//   headers: {
//     "Content-Type": "application/json", // 요청 규칙: json
//   },
//   // 크로스 도메인 요청 시 민감 정보 포함 여부 지정
//   withCredentials: true, // cookie, 헤더의 authorization, etc..
// });

// // 모든 request를 interceptor로 가로채 토큰 만료 선 체크
// // config: request가 담김
// axiosInstance.interceptors.request.use(async (config) => {
//   // reissue 요청은 재발급 로직을 타지 않도록 함
//   const noRetry = /^\/api\/auth\/reissue$/;
//   let { accessToken } = store.getState().auth;

//   try {
//     // accessToken이 있고, reissue 요청이 아닐 때만 실행
//     if (accessToken && !noRetry.test(config.url)) {
//       // 액세스 토큰 만료 확인
//       const claims = jwtDecode(accessToken);
//       const now = dayjs().unix();
//       // 만료 5분 전일 경우 재발급
//       const expTime = dayjs.unix(claims.exp).add(-5, "minute").unix();

//       if (now >= expTime) {
//         config._retry = true; // 재시도 플래그 (선택적)
//         console.log("Access Token 만료 감지, 재발급을 시도합니다.");
//         const response = await store.dispatch(reissueThunk()).unwrap();

//         // ★★★★★★★★★★★★★★★★★★★★★★★★★★
//         // 여기가 수정된 부분입니다.
//         accessToken = response.accessToken;
//         // ★★★★★★★★★★★★★★★★★★★★★★★★★★

//         console.log("Access Token 재발급 성공");
//       }

//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }

//     return config;
//   } catch (error) {
//     console.log("axios interceptor에서 에러 발생:", error);
//     // 여기서 에러를 반환하면 요청이 중단됩니다.
//     return Promise.reject(error);
//   }
// });

// export default axiosInstance;
