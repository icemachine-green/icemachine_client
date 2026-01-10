import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessesThunk } from "../../store/thunks/businessThunk";
import "./MyStores.css";
import "../common/CommonStyles.css"; // 공통 CSS 임포트

const MyStores = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { businessesList, listStatus, listError } = useSelector(
    (state) => state.business
  );

  useEffect(() => {
    dispatch(getBusinessesThunk());
  }, [dispatch]);

  const redirectMyPage = () => navigate("/mypage");
  const redirectMyStoreCreate = () => navigate("/mypage/stores/create");

  // 로딩 및 에러 상태에서도 레이아웃 구조 유지 (푸터 밀림 방지)
  if (listStatus === "loading") {
    return (
      <div className="my-stores-container">
        <div className="common-page-head">
          <p className="my-stores-head-title">내 매장 정보</p>
          <button className="common-btn-back" onClick={redirectMyPage}>
            <span>〈</span> 뒤로 가기
          </button>
        </div>
        <hr className="my-stores-underline" />
        <div className="my-stores-state-msg">매장 정보를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="my-stores-container">
      {/* 헤더: 공통 CSS 적용 및 뒤로가기 우측 배치 */}
      <div className="common-page-head">
        <p className="my-stores-head-title">내 매장 정보</p>
        <button className="common-btn-back" onClick={redirectMyPage}>
          <span>〈</span> 뒤로 가기
        </button>
      </div>

      <hr className="my-stores-underline" />

      {/* 매장 추가 버튼 */}
      <div className="my-stores-add-btn-container">
        <button
          className="my-stores-card-new-btn"
          onClick={redirectMyStoreCreate}
        >
          + 매장 새로 등록
        </button>
      </div>

      {/* 매장 목록 카드: 리스트가 추가될수록 그리드 유지 */}
      <div className="my-stores-card-list">
        {listError ? (
          <div className="my-stores-state-msg error">
            매장 목록을 불러오는 데 실패했습니다:{" "}
            {listError.message || "알 수 없는 오류"}
          </div>
        ) : businessesList.length > 0 ? (
          businessesList.map((store) => (
            <div
              className="my-stores-card"
              key={store.id}
              onClick={() => navigate(`/mypage/stores/${store.id}`)}
            >
              <div className="my-stores-card-img-container">
                <img
                  src="/icons/cafeicon.png"
                  alt="매장"
                  className="my-store-card-img"
                />
              </div>
              <div className="my-stores-card-info">
                <p className="my-stores-card-name">{store.name}</p>
                <p className="my-stores-card-address">{store.mainAddress}</p>
                <p className="my-stores-card-phone">
                  {store.phoneNumber || "전화번호 없음"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="my-stores-no-stores">
            <p>등록된 매장이 없습니다.</p>
            <p>새로운 매장을 등록해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStores;
