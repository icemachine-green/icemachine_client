import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header-container">
      {/* 로고 */}
      <Link to="/" className="header-icon-link">
        <img
          src="/icons/logoonly_clear.png"
          alt="홈"
          className="header-icon-home-btn"
        />
      </Link>

      {/* 가운데 선 */}
      <div className="header-line" />

      {/* 로그인 */}
      <Link to="/login" className="header-icon-link login">
        <img
          src="/icons/login.png"
          alt="로그인"
          className="header-icon-login-btn"
        />
      </Link>
    </header>
  );
}