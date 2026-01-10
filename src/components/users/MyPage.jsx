import { useNavigate } from "react-router-dom";
import "./MyPage.css";
import "../common/CommonStyles.css"; // 공통 CSS 임포트

const MyPage = () => {
  const navigate = useNavigate();

  const redirectMyProfile = () => navigate("/mypage/profile");
  const redirectMyStores = () => navigate("/mypage/stores");
  const redirectMyReviews = () => navigate("/mypage/reviews");
  const redirectMyLogout = () => navigate("/mypage/logout");

  return (
    <div className="my-page-container">
      <main className="my-page-content">
        {/* 공통 헤더 적용: 타이틀 좌측 / 뒤로가기 우측 */}
        <div className="common-page-head">
          <p className="my-page-main-title">마이페이지</p>
          <button className="common-btn-back" onClick={() => navigate("/")}>
            <span>〈</span> 메인으로
          </button>
        </div>

        <hr className="my-page-underline" />

        <div className="my-page-card-container">
          {/* 예약 조회 / 취소 */}
          <div
            className="my-page-card"
            onClick={() => navigate("/mypage/reservations")}
          >
            <div className="my-page-card-left">
              <img
                src="/icons/my_page_reservation.png"
                alt="예약"
                className="my-page-card-icon"
              />
              <div className="my-page-card-text">
                <p>예약 조회 / 취소</p>
              </div>
            </div>
            <div className="my-page-card-right">
              <span className="my-page-arrow-icon">〉</span>
            </div>
          </div>

          {/* 회원정보 변경 */}
          <div className="my-page-card" onClick={redirectMyProfile}>
            <div className="my-page-card-left">
              <img
                src="/icons/my_page_change_info.png"
                alt="정보변경"
                className="my-page-card-icon"
              />
              <div className="my-page-card-text">
                <p>회원정보 변경</p>
              </div>
            </div>
            <div className="my-page-card-right">
              <span className="my-page-arrow-icon">〉</span>
            </div>
          </div>

          {/* 내 매장 정보 */}
          <div className="my-page-card" onClick={redirectMyStores}>
            <div className="my-page-card-left">
              <img
                src="/icons/my_page_store_info.png"
                alt="매장"
                className="my-page-card-icon"
              />
              <div className="my-page-card-text">
                <p>내 매장 정보</p>
              </div>
            </div>
            <div className="my-page-card-right">
              <span className="my-page-arrow-icon">〉</span>
            </div>
          </div>

          {/* 내 리뷰 내역 */}
          <div className="my-page-card" onClick={redirectMyReviews}>
            <div className="my-page-card-left">
              <img
                src="/icons/my_page_review.png"
                alt="리뷰"
                className="my-page-card-icon"
              />
              <div className="my-page-card-text">
                <p>내 리뷰 내역</p>
              </div>
            </div>
            <div className="my-page-card-right">
              <span className="my-page-arrow-icon">〉</span>
            </div>
          </div>

          {/* 로그아웃 */}
          <div className="my-page-card" onClick={redirectMyLogout}>
            <div className="my-page-card-left">
              <img
                src="/icons/my_page_logout.png"
                alt="로그아웃"
                className="my-page-card-icon"
              />
              <div className="my-page-card-text">
                <p>로그아웃</p>
              </div>
            </div>
            <div className="my-page-card-right">
              <span className="my-page-arrow-icon">〉</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
