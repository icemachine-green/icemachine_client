import { useNavigate } from "react-router-dom";
import "./MyReservationTable.css";

const MyReservationTablePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mypage-reservation-page-container">

      {/* 헤더 */}
      <div className="mypage-reservation-page-head">
        <button
          className="reservation-back-btn"
          onClick={() => navigate(-1)}
        >
          뒤로 가기
        </button>
        <p>예약 조회 / 취소</p>
      </div>

      <hr className="mypage-reservation-page-underline" />

      {/* 테이블 */}
      <div className="reservation-table-wrapper">

        {/* 헤더 */}
        <div className="reservation-table-header">
          <div>신청 날짜</div>
          <div>예약 정보</div>
          <div>배정 기사 정보</div>
          <div>현재 상태</div>
          <div>결제 내역</div>
        </div>

        {/* row 1 */}
        <div className="reservation-table-row">
          <div>2025-12-26</div>

          <div className="reservation-info">
            <p>홍길동님</p>
            <p>010-1234-5678</p>
            <p>대구시 동구 큰고개로 50</p>
          </div>

          <div className="engineer-info">
            <p>김정현 기사</p>
            <p>010-3455-7777</p>
          </div>

          <div className="status-cell">
            <span className="status-badge complete">예약 완료</span>
          </div>

          <div className="payment-info">120,000원</div>
        </div>

        {/* row 2 */}
        <div className="reservation-table-row">
          <div>2025-12-25</div>

          <div className="reservation-info">
            <p>홍길동님</p>
            <p>010-1234-5678</p>
            <p>대구시 동구 큰고개로 50</p>
          </div>

          <div className="engineer-info">
            <p>김정현 기사</p>
            <p>010-3455-7777</p>
          </div>

          <div className="status-cell">
            <span className="status-badge progress">서비스 진행중</span>
          </div>

          <div className="payment-info">150,000원</div>
        </div>

      </div>

      {/* 페이지네이션 */}
      <div className="mypage-reservation-pagination">
        <button>&lt;</button>
        <button className="active">1</button>
        <button>&gt;</button>
      </div>

    </div>
  );
};

export default MyReservationTablePage;
