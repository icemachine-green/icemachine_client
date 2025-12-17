import './Header.css';

export default function Header() {
  return (
    <header className="header-ice-header">
      {/* 얼음 로고 = 홈 버튼(지금은 동작 없이 버튼만) */}
      <button type="button" className="header-ice-header__logoBtn" aria-label="홈">
        <img
          className="header-ice-header__logoImg"
          src="/icons/mobile_homeicon.png"
          alt="홈"
        />
      </button>

      <div className="header-ice-header__spacer" />

      {/* 로그인 버튼(지금은 동작 없이 버튼만) */}
      <button type="button" className="header-ice-header__loginBtn">
        <img className="header-ice-header__loginIcon" src="/icons/login.png" alt="" />
        <span className="header-ice-header__loginText">LOGIN</span>
      </button>
    </header>
  );
}
