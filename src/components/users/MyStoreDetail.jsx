import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBusinessDetailThunk, deleteBusinessThunk, } from "../../store/thunks/businessThunk";
import { getIcemachinesByBusinessIdThunk, deleteIcemachineThunk, } from "../../store/thunks/icemachineThunk";

import MyStoreEditModal from "./MyStoreEditModal.jsx";
import MyStoreAddIcemachineModal from "./MyStoreAddIcemachineModal.jsx";
import "./MyStoreDetail.css";
// import MyStoreDetailSkeleton from "../common/Skeleton/MyStoreDetailSkeleton.jsx"; // 스켈레톤 컴포넌트 추가

const MyStoreDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const businessId = params.id || params.storeId || params.businessId;

  const { accessToken } = useSelector((state) => state.auth);
  const { businessDetail, detailStatus } = useSelector(
    (state) => state.business
  );
  const { icemachinesList } = useSelector((state) => state.icemachine);

  const [isBusinessEditOpen, setIsBusinessEditOpen] = useState(false);
  const [isIceMachineAddOpen, setIsIceMachineAddOpen] = useState(false);
  const [isBusinessFlashing, setIsBusinessFlashing] = useState(false);

  const handleBusinessUpdateSuccess = () => {
    setIsBusinessFlashing(true);
    dispatch(getBusinessDetailThunk(Number(businessId)));
    setTimeout(() => setIsBusinessFlashing(false), 1500);
  };

  const handleIceMachineAddSuccess = () => {
    dispatch(getIcemachinesByBusinessIdThunk(Number(businessId)));
    setIsIceMachineAddOpen(false);
  };

  const formatValue = (val) => val || "정보 없음";

  useEffect(() => {
    if (businessId && accessToken) {
      dispatch(getBusinessDetailThunk(Number(businessId)));
      dispatch(getIcemachinesByBusinessIdThunk(Number(businessId)));
    }
  }, [dispatch, businessId, accessToken]);

  const handleDeleteStore = async () => {
    if (window.confirm("정말로 이 매장을 삭제하시겠습니까?")) {
      await dispatch(deleteBusinessThunk(Number(businessId))).unwrap();
      navigate("/mypage/stores");
    }
  };

  const handleDeleteIcemachine = async (id) => {
    if (window.confirm("제빙기 정보를 삭제하시겠습니까?")) {
      await dispatch(deleteIcemachineThunk(id)).unwrap();
      dispatch(getIcemachinesByBusinessIdThunk(Number(businessId)));
    }
  };

  // 로딩 중일 때 스켈레톤 노출
  if (detailStatus === "loading" && !businessDetail) {
    return <div className="my-store-detail-wrapper">로딩 중...</div>;
    // return <MyStoreDetailSkeleton />;
  }

  return (
    <div className="my-store-detail-wrapper">
      <div className="my-store-detail-header-flex">
        <h2 className="my-store-detail-main-title">매장 상세 정보</h2>
        <button className="common-btn-back" onClick={() => navigate(-1)}>
          <span>〈</span> 뒤로 가기
        </button>
      </div>

      <hr className="my-store-detail-divider" />

      {businessDetail ? (
        <div
          className={`my-store-detail-card ${
            isBusinessFlashing ? "flash-update" : ""
          }`}
        >
          <div className="store-info-section">
            <div className="section-header">
              <h3 className="store-name-text">{businessDetail.name}</h3>
              <button
                className="btn-edit-small"
                onClick={() => setIsBusinessEditOpen(true)}
              >
                수정
              </button>
            </div>

            <div className="info-grid">
              <div className="info-row">
                <span className="info-label">주소</span>
                <span className="info-value">
                  {businessDetail.mainAddress} {businessDetail.detailedAddress}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">연락처</span>
                <span className="info-value">{businessDetail.phoneNumber}</span>
              </div>
              <div className="info-row">
                <span className="info-label">담당자</span>
                <span className="info-value">{businessDetail.managerName}</span>
              </div>
            </div>
          </div>

          <div className="icemachine-section">
            <div className="section-header">
              <h4 className="sub-title">등록된 제빙기</h4>
              <button
                className="btn-add-small"
                onClick={() => setIsIceMachineAddOpen(true)}
              >
                + 추가
              </button>
            </div>

            <div className="icemachine-list">
              {icemachinesList && icemachinesList.length > 0 ? (
                icemachinesList.map((item) => (
                  <div key={item.id} className="icemachine-item-box">
                    <div className="ice-info">
                      <p>
                        <strong>브랜드:</strong> {formatValue(item.brandName)}
                      </p>
                      <p>
                        <strong>모델명:</strong> {formatValue(item.modelName)}
                      </p>
                      <p>
                        <strong>사이즈:</strong> {formatValue(item.sizeType)}
                      </p>
                    </div>
                    <button
                      className="btn-del-mini"
                      onClick={() => handleDeleteIcemachine(item.id)}
                    >
                      삭제
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-data-text">등록된 제빙기가 없습니다.</p>
              )}
            </div>
          </div>

          {/* 인라인 버튼 배치: 카드 내부 하단에 자연스럽게 위치 */}
          <div className="my-store-detail-inline-actions">
            <button className="btn-delete-inline" onClick={handleDeleteStore}>
              매장 삭제
            </button>
            <button
              className="btn-reserve-inline"
              onClick={() => navigate(`/reservation?businessId=${businessId}`)}
            >
              예약 하기
            </button>
          </div>
        </div>
      ) : (
        <p className="no-data-text">데이터가 없습니다.</p>
      )}

      {isBusinessEditOpen && (
        <MyStoreEditModal
          business={businessDetail}
          onClose={() => setIsBusinessEditOpen(false)}
          onUpdateSuccess={handleBusinessUpdateSuccess}
        />
      )}

      {isIceMachineAddOpen && (
        <MyStoreAddIcemachineModal
          businessId={businessId}
          onClose={() => setIsIceMachineAddOpen(false)}
          onSuccess={handleIceMachineAddSuccess}
        />
      )}
    </div>
  );
};

export default MyStoreDetail;