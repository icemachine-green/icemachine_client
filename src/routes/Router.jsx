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
import MyLogout from "../components/users/MyLogout.jsx";
import MyReservationTable from "../components/users/MyReservationTable.jsx";
import ReservationPage from "../components/reservation/ReservationPage.jsx";
import Social from "../components/login/Social.jsx";

import MyStoreDetail from "../components/users/MyStoreDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/callback/social",
    element: <Social />,
  },
  {
    path: "/callback/social",
    element: <Social />,
  },
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
        path: "/mypage/stores/:businessId",
        element: <MyStoreDetail />,
      },
      {
        path: "/mypage/stores/create",
        element: <MyStoreCreate />,
      },
      {
        path: "/mypage/reservations",
        element: <MyReservations />,
      },
      {
        path: "/mypage/reviews",
        element: <MyReviews />
      },
      {
        path: "/mypage/logout",
        element: <MyLogout />,
      },
      {
        path: "/mypage/reservations/table",
        element: <MyReservationTable />,
      },
      {
        path: "/reservation",
        element: <ReservationPage />,
      },
      // 앞으로 다른 페이지가 추가되면 이 배열에 추가합니다.
      // 예: { path: '/login', element: <LoginPage /> }
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;