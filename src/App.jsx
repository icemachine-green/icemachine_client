import "./App.css";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import TopButton from "./components/common/TopButton.jsx";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reissueThunk } from "./store/thunks/authThunk.js";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    // 앱이 처음 로딩될 때 (status가 'idle'일 때)만 실행
    if (status === "idle") {
      dispatch(reissueThunk());
    }
  }, [status, dispatch]);

  // 로그인 상태 확인 중이면 로딩 화면을 보여줌
  if (status === "loading" || status === "idle") {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <TopButton />
    </>
  );
}

export default App;
