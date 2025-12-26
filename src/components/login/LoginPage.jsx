import React from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/kakao/authorize"; // TODO: 환경변수설정
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <img src="/icons/logoonly.png" alt="싹싹이 로고" />
        </div>

        <div className="login-form">
          <img
            className="login-kakao"
            src="/icons/kakao_login.png"
            alt="카카오로 시작하기"
            onClick={handleKakaoLogin}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
