import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import "./MyLogout.css";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // useDispatch 임포트
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBack = () => {
    navigate("/mypage");
  };

  const handleLogout = () => {
    dispatch(logout()); // Redux logout 액션 디스패치
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/");
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

      {/* 🔔 알림 모달 (기존 레이아웃과 완전 분리) */}
      {isModalOpen && (
        <div className="logout-alert-dim">
          <div className="logout-alert-modal">
            <div className="logout-alert-header">
              <span>알림</span>
              <button onClick={handleModalConfirm}>×</button>
            </div>

            <div className="logout-alert-body">
              <img
                src="/public/icons/checkicon.png"
                alt="체크"
              />
              <p>로그아웃 되었습니다.</p>
            </div>

            <button
              className="logout-alert-confirm"
              onClick={handleModalConfirm}
            >
              확인
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default LogoutPage;
