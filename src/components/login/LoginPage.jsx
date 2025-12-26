import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  // /signup으로 리다이렉트
  const handleRedirectToSignup = () => {
    navigate("/signup");
  };
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
            onClick={handleRedirectToSignup}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
