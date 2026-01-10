import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.css";

export default function Header() {
  const { isLoggedIn } = useSelector((state) => state.auth);

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

      {/* 가운데 선 - 모바일은 숨김 처리 스타일 적용 */}
      <div className="header-line" />

      {/* 로그인 상태에 따른 아이콘 변경 */}
      <Link
        to={isLoggedIn ? "/mypage" : "/login"}
        className="header-icon-link login"
      >
        <img
          src={isLoggedIn ? "/icons/my_page.png" : "/icons/login.png"}
          alt={isLoggedIn ? "마이페이지" : "로그인"}
          className="header-icon-login-btn"
        />
      </Link>
    </header>
  );
}
