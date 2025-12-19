import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header-container">
      <Link to="/" className="header-icon-link">
        <img
          src="/icons/logoonly_clear.png"
          alt="홈"
          className="header-icon-home-btn"
        />
      </Link>

      <div className="header-divider" />

      <Link to="/login" className="header-icon-link">
        <img
          src="/icons/login.png"
          alt="로그인"
          className="header-icon-login-btn"
        />
      </Link>
    </header>
  );
}
