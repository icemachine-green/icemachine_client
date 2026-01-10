import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBusinessDetailThunk,
  deleteBusinessThunk,
} from "../../store/thunks/businessThunk";
import {
  getIcemachinesByBusinessIdThunk,
  deleteIcemachineThunk,
} from "../../store/thunks/icemachineThunk";

import MyStoreEditModal from "./MyStoreEditModal.jsx";
import MyStoreAddIcemachineModal from "./MyStoreAddIcemachineModal.jsx";
import "./MyStoreDetail.css";
import { clearReservationState } from "../../store/slices/reservationSlice";

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

  // 1. 매장 정보 갱신 및 효과
  const handleBusinessUpdateSuccess = () => {
    setIsBusinessFlashing(true);
    dispatch(getBusinessDetailThunk(Number(businessId))); // 다시 불러오기
    setTimeout(() => setIsBusinessFlashing(false), 1500);
  };

  // 🚩 2. 제빙기 등록 성공 시 목록 다시 불러오기
  const handleIceMachineAddSuccess = () => {
    dispatch(getIcemachinesByBusinessIdThunk(Number(businessId)));
    setIsIceMachineAddOpen(false); // 모달 닫기
  };

  // 🚩 3. 데이터 표시 보정 (DB 저장된 문자열 그대로 출력)
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

  if (detailStatus === "loading" && !businessDetail) {
    return <div className="my-store-detail-container">로딩 중...</div>;
  }

  return (
    <div className="my-store-detail-container">
      <div className="my-store-detail-head">
        <button
          className="my-store-detail-back-btn"
          onClick={() => navigate(-1)}
        >
          뒤로가기
        </button>
        <h2 className="my-store-detail-head-title">매장 상세 정보</h2>
      </div>
      <hr className="my-store-detail-underline" />

      <div
        className={`my-store-detail-content ${
          isBusinessFlashing ? "flash-update" : ""
        }`}
      >
        {businessDetail ? (
          <>
            <button
              className="my-store-detail-edit-btn-in-box"
              onClick={() => setIsBusinessEditOpen(true)}
            >
              매장 정보 수정
            </button>

            <h3>{businessDetail.name}</h3>
            <p>
              <strong>주소:</strong> {businessDetail.mainAddress}{" "}
              {businessDetail.detailedAddress}
            </p>
            <p>
              <strong>매장 연락처:</strong> {businessDetail.phoneNumber}
            </p>
            <p>
              <strong>담당자:</strong> {businessDetail.managerName}
            </p>

            <div className="icemachine-list-header">
              <h4>등록된 제빙기</h4>
              <button
                className="my-store-detail-add-icemachine-btn-in-header"
                onClick={() => setIsIceMachineAddOpen(true)}
              >
                제빙기 추가
              </button>
            </div>

            <div className="icemachine-list">
              {icemachinesList && icemachinesList.length > 0 ? (
                icemachinesList.map((item) => (
                  <div key={item.id} className="icemachine-detail-item">
                    <div className="icemachine-info">
                      {/* 🚩 DB 컬럼명에 맞춰 brandName, modelName, sizeType으로 매핑 */}
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
                    <div className="icemachine-actions-per-item">
                      <button
                        className="my-store-detail-delete-icemachine-btn"
                        onClick={() => handleDeleteIcemachine(item.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">등록된 제빙기가 없습니다.</p>
              )}
            </div>
          </>
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>

      <div className="my-store-detail-bottom-actions">
        <button
          className="my-store-detail-delete-btn-bottom"
          onClick={handleDeleteStore}
        >
          매장 삭제
        </button>
        <button
          className="my-store-detail-reserve-btn-bottom"
          onClick={() => navigate(`/reservation?businessId=${businessId}`)}
        >
          예약 하기
        </button>
      </div>

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
          onSuccess={handleIceMachineAddSuccess} // 🚩 성공 콜백 추가
        />
      )}
    </div>
  );
};

export default MyStoreDetail;
