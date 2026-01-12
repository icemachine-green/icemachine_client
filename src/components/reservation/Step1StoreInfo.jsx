import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep, updateSelection } from "../../store/slices/reservationSlice";
import { getBusinessDetailThunk } from "../../store/thunks/businessThunk";
import { getIcemachinesByBusinessIdThunk } from "../../store/thunks/icemachineThunk";
import "./Step1StoreInfo.css";

const Step1StoreInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 리덕스 데이터 추출
  const { businessDetail, businessesList = [] } = useSelector(
    (state) => state.business
  );
  const { icemachinesList = [] } = useSelector((state) => state.icemachine);
  const { selection } = useSelector((state) => state.reservation);
  const { items: policies = [] } = useSelector(
    (state) => state.servicePolicy || {}
  );

  // 상태 관리
  const [showAddr, setShowAddr] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  // 제빙기 사이즈 정규화 로직
  const getNormalizedSize = (machine) => {
    const size = String(machine?.sizeType || machine?.size || "").toUpperCase();
    if (size.includes("SMALL") || size.includes("소형")) return "소형";
    if (size.includes("MEDIUM") || size.includes("중형")) return "중형";
    if (size.includes("LARGE") || size.includes("대형")) return "대형";
    return "미지정";
  };

  const selectedMachine = icemachinesList.find(
    (m) => m.id === selection.iceMachineId
  );
  const targetSize = getNormalizedSize(selectedMachine);
  const filteredPolicies = policies.filter((p) => p.sizeType === targetSize);

  // 매장 선택 처리 함수
  const handleStoreSelect = (storeId) => {
    dispatch(getBusinessDetailThunk(storeId));
    dispatch(getIcemachinesByBusinessIdThunk(storeId));
    dispatch(
      updateSelection({
        businessId: storeId,
        iceMachineId: null,
        servicePolicyId: null,
      })
    );
    setIsStoreModalOpen(false);
  };

  return (
    <div className="Step1StoreInfo-div-root">
      <header className="Step1StoreInfo-header-main">
        <div className="Step1StoreInfo-div-headerLeft"></div>
        <div className="Step1StoreInfo-div-headerCenter">
          <h2 className="Step1StoreInfo-h2-title">서비스 예약</h2>
          <div className="Step1StoreInfo-div-indicator">
            <span className="Step1StoreInfo-span-dot active"></span>
            <span className="Step1StoreInfo-span-dot"></span>
            <span className="Step1StoreInfo-span-dot"></span>
          </div>
        </div>
        <div className="Step1StoreInfo-div-headerRight">
          <button
            className="Step1StoreInfo-button-back"
            onClick={() => navigate(-1)}
          >
            〈 뒤로
          </button>
        </div>
      </header>

      <div className="Step1StoreInfo-div-contentBody">
        <section className="Step1StoreInfo-section-store">
          <div className="Step1StoreInfo-div-storeCard">
            <span className="Step1StoreInfo-span-badge">내 매장 정보</span>
            <h3 className="Step1StoreInfo-h3-storeName">
              {businessDetail?.name || "매장명 없음"}
            </h3>

            {/* [위치 수정] 매장 이름 바로 밑으로 이동 */}
            <button
              className="Step1StoreInfo-button-addrToggle"
              onClick={() => setShowAddr(!showAddr)}
            >
              주소 상세 정보 {showAddr ? "접기 ▲" : "확인 ▼"}
            </button>

            {showAddr && (
              <div className="Step1StoreInfo-div-addrBox fadeIn">
                <p className="Step1StoreInfo-p-addrMain">
                  {businessDetail?.mainAddress}
                </p>
                <p className="Step1StoreInfo-p-addrSub">
                  {businessDetail?.detailedAddress}
                </p>
              </div>
            )}

            <div className="Step1StoreInfo-div-infoList">
              <div className="Step1StoreInfo-div-infoRow">
                <label className="Step1StoreInfo-label-info">담당자</label>
                <span className="Step1StoreInfo-span-value">
                  {businessDetail?.managerName || "정보 없음"}
                </span>
              </div>
              <div className="Step1StoreInfo-div-infoRow">
                <label className="Step1StoreInfo-label-info">연락처</label>
                <span className="Step1StoreInfo-span-value highlight">
                  {businessDetail?.phoneNumber || "정보 없음"}
                </span>
              </div>
            </div>

            <button
              className="Step1StoreInfo-button-changeStore"
              onClick={() => setIsStoreModalOpen(true)}
            >
              매장 변경하기
            </button>
          </div>
        </section>

        <section className="Step1StoreInfo-section-machine">
          <div className="Step1StoreInfo-div-sectionHeader">
            <h4 className="Step1StoreInfo-h4-sectionTitle">점검 대상 제빙기</h4>
            <span className="Step1StoreInfo-span-machineCount">
              {icemachinesList.length}대
            </span>
          </div>

          <div className="Step1StoreInfo-div-scrollWrapper">
            {icemachinesList.map((m) => (
              <div
                key={m.id}
                className={`Step1StoreInfo-div-machineCard ${
                  selection.iceMachineId === m.id ? "active" : ""
                }`}
                onClick={() =>
                  dispatch(
                    updateSelection({
                      iceMachineId: m.id,
                      servicePolicyId: null,
                    })
                  )
                }
              >
                <div className="Step1StoreInfo-div-cardIcon">
                  {selection.iceMachineId === m.id ? "✅" : "❄️"}
                </div>
                <div className="Step1StoreInfo-div-machineDetail">
                  <span className="Step1StoreInfo-span-mBrand">{m.brand}</span>
                  <strong className="Step1StoreInfo-strong-mModel">
                    {m.fullModelName}
                  </strong>
                </div>
                <div className="Step1StoreInfo-div-mSizeBadge">
                  {getNormalizedSize(m)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {selection.iceMachineId ? (
          <section className="Step1StoreInfo-section-policy fadeIn">
            <div className="Step1StoreInfo-div-sectionHeader">
              <h4 className="Step1StoreInfo-h4-sectionTitle">서비스 선택</h4>
              <span className="Step1StoreInfo-span-sizeInfo">
                {targetSize} 기준
              </span>
            </div>

            <div className="Step1StoreInfo-div-policyStack">
              {filteredPolicies.map((p) => (
                <div
                  key={p.id}
                  className={`Step1StoreInfo-div-policyCard ${
                    selection.servicePolicyId === p.id ? "active" : ""
                  }`}
                  onClick={() =>
                    dispatch(updateSelection({ servicePolicyId: p.id }))
                  }
                >
                  <div className="Step1StoreInfo-div-pHeader">
                    <span className="Step1StoreInfo-span-pName">
                      {p.serviceType}
                    </span>
                    <span className="Step1StoreInfo-span-pPrice">
                      {p.price.toLocaleString()}원
                    </span>
                  </div>
                  <p className="Step1StoreInfo-p-pDesc">{p.note}</p>
                  <div className="Step1StoreInfo-div-pFooter">
                    <span className="Step1StoreInfo-span-pTime">
                      소요시간 약 {p.standardDuration}분
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="Step1StoreInfo-div-guideBox">
            위에서 제빙기를 선택하시면 예약 가능한 서비스가 표시됩니다.
          </div>
        )}
      </div>

      {isStoreModalOpen && (
        <div
          className="Step1StoreInfo-Modal-overlay"
          onClick={() => setIsStoreModalOpen(false)}
        >
          <div
            className="Step1StoreInfo-Modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="Step1StoreInfo-Modal-handle" />
            <div className="Step1StoreInfo-Modal-header">
              <h3 className="Step1StoreInfo-Modal-h3">매장 선택</h3>
            </div>
            <div className="Step1StoreInfo-Modal-list">
              {businessesList.map((store) => (
                <div
                  key={store.id}
                  className={`Step1StoreInfo-Modal-item ${
                    businessDetail?.id === store.id ? "selected" : ""
                  }`}
                  onClick={() => handleStoreSelect(store.id)}
                >
                  <div className="Step1StoreInfo-Modal-itemInfo">
                    <strong className="Step1StoreInfo-Modal-storeName">
                      {store.name}
                    </strong>
                    <span className="Step1StoreInfo-Modal-storeAddr">
                      {store.mainAddress}
                    </span>
                  </div>
                  {businessDetail?.id === store.id && (
                    <span className="Step1StoreInfo-Modal-check">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="Step1StoreInfo-footer-action">
        <button
          className="Step1StoreInfo-button-next"
          disabled={!selection.iceMachineId || !selection.servicePolicyId}
          onClick={() => dispatch(setStep(2))}
        >
          {selection.servicePolicyId
            ? "다음 단계 (일정 선택)"
            : "항목을 선택해주세요"}
        </button>
      </footer>
    </div>
  );
};

export default Step1StoreInfo;
