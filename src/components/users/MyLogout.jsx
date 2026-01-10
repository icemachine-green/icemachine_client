import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import "./MyLogout.css";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBack = () => {
    navigate("/mypage");
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="logout-page-container">
      {/* 상단 헤더 영역 - 제목 왼쪽, 버튼 오른쪽 */}
      <div className="logout-page-head">
        <h1 className="logout-page-title">로그아웃</h1>
        <button className="common-btn-back" onClick={handleBack}>
          〈 뒤로 가기
        </button>
      </div>

      <div className="logout-content-wrapper">
        <div className="logout-card">
          <div className="logout-icon-circle">
            {/* 시안에 있는 전원 아이콘 등 적절한 이미지 경로로 수정하세요 */}
            <img src="/public/icons/my_page_logout.png" alt="로그아웃" />
          </div>

          <h2 className="logout-main-text">로그아웃 하시겠습니까?</h2>
          <p className="logout-sub-text">
            언제든 다시 돌아와 제빙기를 관리해 주세요.
          </p>

          <div className="logout-btn-group">
            <button className="btn-no" onClick={handleBack}>
              아니오
            </button>
            <button className="btn-yes" onClick={handleLogout}>
              예
            </button>
          </div>
        </div>
      </div>

      {/* 🔔 로그아웃 완료 알림 모달 */}
      {isModalOpen && (
        <div className="logout-alert-dim">
          <div className="logout-alert-modal">
            <div className="logout-alert-body">
              <div className="check-icon-wrapper">
                <img src="/public/icons/checkicon.png" alt="체크" />
              </div>
              <h3>로그아웃 완료</h3>
              <p>안전하게 로그아웃 되었습니다.</p>
            </div>
            <button
              className="logout-alert-confirm-btn"
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
