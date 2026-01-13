import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";

const PREFIX = import.meta.env.VITE_APP_NAME;

// --------------------------
// 정적 파일 캐싱
// --------------------------
precacheAndRoute(self.__WB_MANIFEST);

// --------------------------
// HTML 오프라인 대응
// --------------------------
registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: `${PREFIX}-html-cache`,
    networkTimeoutSeconds: 3,
  })
);

// --------------------------
// 이미지 캐싱
// --------------------------
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: `${PREFIX}-image-cache`,
    networkTimeoutSeconds: 3,
  })
);

// --------------------------
// API 요청 캐싱(최소 동작 보장, GET을 제외한 나머지는 제외)
// --------------------------
// registerRoute(
//   ({request, url}) => url.origin === import.meta.env.VITE_SERVER_URL && request.method === 'GET',
//   new StaleWhileRevalidate({
//     cacheName: `${PREFIX}-api-cache`,
//     networkTimeoutSeconds: 3
//   })
// );

// --------------------------
// 웹푸시 핸들러
// --------------------------
self.addEventListener("push", (e) => {
  // self: 서비스워커 자신
  // {
  //   title,
  //   message,
  //   data: {
  //     targetUrl: string
  //   }
  // }
  const data = e.data.json(); // js객체형태로 가져옴(백엔드에서 셋팅한 payload 가져옴)
  const targetUrl = data.data?.targetUrl;
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "/icons/32_logo.png",
    data: {
      targetUrl,
    },
  });
});

// --------------------------
// 웹푸시 클릭 이벤트
// --------------------------
self.addEventListener("notificationclick", (e) => {
  e.notification.close(); // 푸시 알림창 닫기

  // 리다이렉트처리가 필요없는 푸시인 경우, 처리 종료
  if (!e.notification.data.targetUrl) return;

  // 페이로드에서 백엔드가 전달해 준 전체 URL 추출
  const openUrl = e.notification.data.targetUrl;

  // Origin 획득
  const origin = self.location.origin; // 도메인 주소

  e.waitUntil(
    // clients의 구조
    // [
    //   WindowClient = {
    //     focused: false,
    //     frameType: "top-level",
    //     id: "f6e4c645-16ba-4ebe-9600-443b91141742",
    //     type: "window",
    //     url: "http://localhost:3000/posts",
    //     visibilityState: "visible"
    //   },
    //   // ...
    // ]
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        // 앱에서 루트 도메인 탭이 있는지 확인
        const myClient = clients.find((client) =>
          client.url.startsWith(origin)
        );

        // 재활용할 탭이 있다면 포커스 및 네비게이트 처리
        if (myClient) {
          myClient.focus();
          return myClient.navigate(openUrl);
        }

        // 재활용할 탭이 없다면 새창으로 열기
        if (self.clients.openWindow) {
          return self.clients.openWindow(openUrl);
        }
      })
  );
});
