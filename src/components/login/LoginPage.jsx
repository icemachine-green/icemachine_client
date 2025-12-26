import React from "react";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import { startKakaoLogin } from "../../store/slices/authSlice.js";

const LoginPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="login-page">
      <div className="login-container">
        {/* 로고 영역 */}
        <div className="login-logo">
          <img src="/icons/logoonly.png" alt="싹싹이 로고" />
        </div>

        {/* 카카오 로그인 영역 */}
        <div className="login-form">
          <img
            className="login-kakao"
            src="/icons/kakao_login.png"
            alt="카카오톡 로그인 이미지"
            onClick={() => dispatch(startKakaoLogin())}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
