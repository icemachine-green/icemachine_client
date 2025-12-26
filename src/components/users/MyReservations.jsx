import { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./MyReservations.css";

const MyReservationPage = () => {
  const navigate = useNavigate();

  function redirectMyReservation() {
    return navigate('/mypage');
  };

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const handleConfirmCancel = () => {
    alert("예약이 취소되었습니다.");
    setIsCancelModalOpen(false);
  };

  return (
    <div className="mypage-reservation-page-container">

      {/* 헤더 */}
      <div className="mypage-reservation-page-head">
        <button className="reservation-back-btn" onClick={redirectMyReservation}>
          뒤로 가기
        </button>
        <p>예약 조회 / 취소</p>
      </div>

      <hr className="mypage-reservation-page-underline" />

      {/* 예약 리스트 */}
      <div className="mypage-reservation-list-container">

        {/* 취소 가능 카드 */}
        <div className="mypage-reservation-card">
          <p className="mypage-reservation-date">
            2025.12.25. (목) 오전 11:00
          </p>
          <div className="mypage-reservation-card-actions">
            <button className="btn-view">예약 조회</button>
            <button className="btn-cancel" onClick={openCancelModal}>
              취소
            </button>
          </div>
        </div>

        <div className="mypage-reservation-card">
          <p className="mypage-reservation-date">
            2025.12.24. (수) 오전 11:00
          </p>
          <div className="mypage-reservation-card-actions">
            <button className="btn-view">예약 조회</button>
            <button className="btn-cancel" onClick={openCancelModal}>
              취소
            </button>
          </div>
        </div>

        {/* 완료 카드 */}
        <div className="mypage-reservation-card completed">
          <p className="mypage-reservation-date">
            2025.12.23. (화) 오후 2:00
          </p>
          <div className="mypage-reservation-card-actions">
            <span className="reservation-status">완료</span>
            <button className="btn-cancel disabled">취소</button>
          </div>
        </div>
        {/* 완료 카드 */}
        <div className="mypage-reservation-card completed">
          <p className="mypage-reservation-date">
            2025.12.23. (화) 오후 2:00
          </p>
          <div className="mypage-reservation-card-actions">
            <span className="reservation-status">완료</span>
            <button className="btn-cancel disabled">취소</button>
          </div>
        </div>
        {/* 완료 카드 */}
        <div className="mypage-reservation-card completed">
          <p className="mypage-reservation-date">
            2025.12.23. (화) 오후 2:00
          </p>
          <div className="mypage-reservation-card-actions">
            <span className="reservation-status">완료</span>
            <button className="btn-cancel disabled">취소</button>
          </div>
        </div>
        {/* 완료 카드 */}
        <div className="mypage-reservation-card completed">
          <p className="mypage-reservation-date">
            2025.12.23. (화) 오후 2:00
          </p>
          <div className="mypage-reservation-card-actions">
            <span className="reservation-status">완료</span>
            <button className="btn-cancel disabled">취소</button>
          </div>
        </div>
        {/* 완료 카드 */}
        <div className="mypage-reservation-card completed">
          <p className="mypage-reservation-date">
            2025.12.23. (화) 오후 2:00
          </p>
          <div className="mypage-reservation-card-actions">
            <span className="reservation-status">완료</span>
            <button className="btn-cancel disabled">취소</button>
          </div>
        </div>

      </div>

      {/* 페이지네이션 */}
      <div className="mypage-reservation-pagination">
        <button>&lt;</button>
        <button className="active">1</button>
        <button>&gt;</button>
      </div>

      {/* 예약 취소 모달 */}
      {isCancelModalOpen && (
        <div className="mypage-reservation-modal-overlay">
          <div className="mypage-reservation-modal">

            <div className="mypage-reservation-modal-header">
              알림
            </div>

            <div className="mypage-reservation-modal-body">
              <div className="mypage-reservation-modal-icon">
                <img src="/public/icons/information-button.png"
                  alt="알림"
                  className="mypage-reservation-modal-icon-img"/>
              </div>
              <p>정말 예약을 취소하시겠습니까?</p>
            </div>

            <div className="mypage-reservation-modal-footer">
              <button
                className="mypage-reservation-modal-confirm"
                onClick={handleConfirmCancel}
              >
                확인
              </button>
              <button
                className="mypage-reservation-modal-cancel"
                onClick={closeCancelModal}
              >
                취소
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyReservationPage;
