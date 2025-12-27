import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import MainPage from "../components/main/MainPage.jsx";
import ReviewPage from "../components/reviews/ReviewPage.jsx";
import LoginPage from "../components/login/LoginPage.jsx";
import SignupPage from "../components/signup/SignUpPage.jsx";
import MyPage from "../components/users/MyPage.jsx";
import MyProfile from "../components/users/MyProfile.jsx";
import MyStores from "../components/users/MyStores.jsx";
import MyReservations from "../components/users/MyReservations.jsx";
import MyStoreCreate from "../components/users/MyStoreCreate.jsx";
import MyReviews from "../components/users/MyReviews.jsx";
import MyStoreDetail from "../components/users/MyStoreDetail.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/reviews",
        element: <ReviewPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/mypage/profile",
        element: <MyProfile />,
      },
      {
        path: "/mypage/stores",
        element: <MyStores />,
      },
      {
        path: "/mypage/stores/create",
        element: <MyStoreCreate />,
      },
      {
        path: "/mypage/stores/detail",
        element: <MyStoreDetail />,
      },
      {
        path: "/mypage/reservations",
        element: <MyReservations />,
      },
      { path: '/mypage/reviews',
         element: <MyReviews />, 
      },
      // 앞으로 다른 페이지가 추가되면 이 배열에 추가합니다.
      // 예: { path: '/login', element: <LoginPage /> }
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
