import { useNavigate } from 'react-router-dom';
import './MyPage.css';

const MyPage = () => {
  const navigate = useNavigate();

  function redirectMyProfile() {
    return navigate('/mypage/profile');
  }

  return (
      <div className='my-page-container'>

        {/* 헤더 */}
        <div className="my-page-head">
          <p>마이페이지</p>
        </div>

        {/* 가로선 */}
        <hr className="my-page-underline" />

        {/* 카드 영역 */}
        <div className="my-page-card-container">

          {/* 카드1-예약 조회&취소 */}
          <div className="my-page-card">
            <div className="my-page-card-sub-container-1">
              <img src="/icons/my_page_reservation.png" alt="예약조회/취소" className="my-page-card-icon" />
              <div className="my-page-card-text">
                <p>예약 조회 / 취소</p>
              </div>
            </div>
            <div className="my-page-card-sub-container-2">
              <div className="my-page-card-divider" />
              <div className="my-page-card-sub-text">
                <p>예약 내역 확인 및 취소</p>
              </div>
            </div>
          </div>

          {/* 카드2-회원정보 변경 */}
          <div className="my-page-card" onClick={redirectMyProfile}>
            <div className="my-page-card-sub-container-1">
              <img src="/icons/my_page_change_info.png" alt="회원정보 변경" className="my-page-card-icon" />
              <div className="my-page-card-text">
                <p>회원정보 변경</p>
              </div>
            </div>
            <div className="my-page-card-sub-container-2">
              <div className="my-page-card-divider" />
              <div className="my-page-card-sub-text">
                <p>내 정보 수정하기</p>
              </div>
            </div>
          </div>

          {/* 카드3-내 매장 정보 */}
          <div className="my-page-card">
            <div className="my-page-card-sub-container-1">
              <img src="/icons/my_page_store_info.png" alt="매장" className="my-page-card-icon" />
              <div className="my-page-card-text">
                <p>내 매장 정보</p>
              </div>
            </div>
            <div className="my-page-card-sub-container-2">
              <div className="my-page-card-divider" />
              <div className="my-page-card-sub-text">
                <p>내 매장 정보 등록 / 조회</p>
              </div>
            </div>
          </div>

          {/* 카드4-내 리뷰 내역 */}
          <div className="my-page-card">
            <div className="my-page-card-sub-container-1">
              <img src="/icons/my_page_review.png" alt="리뷰" className="my-page-card-icon" />
              <div className="my-page-card-text">
                <p>내 리뷰 내역</p>
              </div>
            </div>
            <div className="my-page-card-sub-container-2">
              <div className="my-page-card-divider" />
              <div className="my-page-card-sub-text">
                <p>내가 작성한 리뷰 보기</p>
              </div>
            </div>
          </div>

          {/* 카드5-로그아웃 */}
          <div className="my-page-card">
            <div className="my-page-card-sub-container-1">
              <img src="/icons/my_page_logout.png" alt="로그아웃" className="my-page-card-icon" />
              <div className="my-page-card-text">
                <p>로그아웃</p>
              </div>
            </div>
            <div className="my-page-card-sub-container-2">
              <div className="my-page-card-divider" />
              <div className="my-page-card-sub-text">
                <p>로그아웃 하기</p>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
};

export default MyPage;
