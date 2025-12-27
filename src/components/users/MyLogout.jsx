import { useNavigate } from "react-router-dom";
import "./MyLogout.css";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/mypage");
  };

  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    // 실제 로그아웃 로직 위치
  };

  return (
    <div className="logout-page-container">

      {/* 상단 헤더 영역 */}
      <div className="logout-page-head">
        <button className="logout-back-btn" onClick={handleBack}>
          뒤로 가기
        </button>
        <p>로그아웃</p>
      </div>

      <hr className="logout-page-underline" />

      {/* 로그아웃 카드 */}
      <div className="logout-card-wrapper">
        <div className="logout-card">

          <div className="logout-icon">
            <img
              src="/public/icons/my_page_logout.png"
              alt="로그아웃"
            />
          </div>

          <p className="logout-message">
            로그아웃 하시겠습니까?
          </p>

          <div className="logout-btn-group">
            <button
              className="logout-btn-confirm"
              onClick={handleLogout}
            >
              예
            </button>
            <button
              className="logout-btn-cancel"
              onClick={handleBack}
            >
              아니오
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LogoutPage;
