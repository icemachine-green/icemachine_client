import "./App.css";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import TopButton from "./components/common/TopButton.jsx";
import NotificationInfo from './components/subscriptions/NotificationInfo.jsx';
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reissueThunk } from "./store/thunks/authThunk.js";
import ScrollToTop from "./components/scrolltotop/ScrollToTop.jsx";

function App() {
  const dispatch = useDispatch();
  // isInitializing 상태를 사용하여 초기 인증 과정을 추적합니다.
  const { isInitializing } = useSelector((state) => state.auth);

  useEffect(() => {
    // 앱이 로딩될 때마다 항상 토큰 재발급을 시도합니다.
    dispatch(reissueThunk());
  }, [dispatch]); // dispatch를 의존성 배열에 추가합니다.

  // 초기 인증 과정이 진행 중이면 로딩 화면을 보여줍니다.
  if (isInitializing) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <ScrollToTop />

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <TopButton />
      <NotificationInfo />
    </>
  );
}

export default App;
