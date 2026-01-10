/**
 * @file Step1StoreInfo.jsx
 * @description 매장 / 제빙기 / 서비스 정책 선택 Step
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep, updateSelection } from "../../store/slices/reservationSlice";
import "./Step1StoreInfo.css";
import Step1StoreInfoSkeleton from "../common/Skeleton/Step1StoreInfoSkeleton.jsx";

const Step1StoreInfo = ({ isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux 상태
  const { businessDetail } = useSelector((state) => state.business);
  const { icemachinesList } = useSelector((state) => state.icemachine);
  const { selection } = useSelector((state) => state.reservation);
  const { items: policies = [], status: policyStatus } = useSelector(
    (state) => state.servicePolicy || {}
  );

  const [showDetail, setShowDetail] = useState(false);

  if (isLoading) return <Step1StoreInfoSkeleton />;

  // 사이즈 텍스트 변환
  const getSafeSize = (machine) => {
    const rawValue = machine?.sizeType || machine?.size || "";
    const val = String(rawValue).toUpperCase();

    if (val.includes("소형") || val.includes("SMALL")) return "소형";
    if (val.includes("중형") || val.includes("MEDIUM")) return "중형";
    if (val.includes("대형") || val.includes("LARGE")) return "대형";
    return "미지정";
  };

  const selectedMachine = icemachinesList?.find(
    (m) => m.id === selection.iceMachineId
  );
  const targetSizeText = getSafeSize(selectedMachine);

  const filteredPolicies = policies.filter(
    (p) => p.sizeType === targetSizeText
  );

  const getServiceTypeName = (type) => {
    const names = {
      VISIT_CHECK: "방문 점검",
      STANDARD_CLEAN: "기본 청소",
      DEEP_CLEAN: "집중 청소",
      PREMIUM_CLEAN: "프리미엄 청소",
      SUBSCRIPTION: "정기 구독",
    };
    return names[type] || type;
  };

  return (
    <div className="step1-container">
      {/* 매장 정보 */}
      <div className="reservation-info-group">
        <div className="label-with-action">
          <label>예약 매장</label>
          <button
            className="change-store-btn"
            onClick={() => navigate("/mypage/stores")}
          >
            변경
          </button>
        </div>

        <div className="info-box-display">
          <div className="store-main-info">
            <span className="store-name">
              **이태우** 님의 {businessDetail?.name || "매장 정보 없음"}
            </span>
            <button
              className="toggle-detail-btn"
              onClick={() => setShowDetail(!showDetail)}
            >
              {showDetail ? "상세 닫기 ▲" : "매장 상세 ▼"}
            </button>
          </div>

          {showDetail && (
            <div className="store-sub-detail">
              <hr />
              <p>
                <strong>주소:</strong> {businessDetail?.mainAddress}{" "}
                {businessDetail?.detailedAddress}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 제빙기 선택 */}
      <div className="reservation-info-group">
        <label>점검 제빙기 선택</label>

        <div className="machine-selection-list">
          {icemachinesList?.length > 0 ? (
            icemachinesList.map((machine) => (
              <div
                key={machine.id}
                className={`machine-card ${
                  selection.iceMachineId === machine.id ? "selected" : ""
                }`}
                onClick={() =>
                  dispatch(
                    updateSelection({
                      iceMachineId: machine.id,
                      servicePolicyId: null,
                    })
                  )
                }
              >
                <div className="machine-card-header">
                  <span className="machine-model">
                    {machine.modelName || machine.model}
                  </span>
                  {selection.iceMachineId === machine.id && (
                    <div className="selection-indicator active">✓</div>
                  )}
                </div>

                <div className="machine-spec">
                  <div className="spec-item">
                    <span className="spec-label">브랜드</span>
                    <span className="spec-value">
                      {machine.brandName || machine.brand || "기타"}
                    </span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">사이즈</span>
                    <span className="spec-value">{getSafeSize(machine)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-selection-placeholder">
              등록된 제빙기가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 서비스 정책 선택 */}
      <div className="reservation-info-group">
        <label>
          서비스 종류 선택{" "}
          {targetSizeText !== "미지정" && (
            <span className="size-badge">{targetSizeText}</span>
          )}
        </label>

        <div className="policy-selection-list">
          {!selection.iceMachineId ? (
            <div className="no-selection-placeholder">
              제빙기를 먼저 선택해주세요.
            </div>
          ) : filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className={`policy-card-item ${
                  selection.servicePolicyId === policy.id ? "selected" : ""
                }`}
                onClick={() =>
                  dispatch(updateSelection({ servicePolicyId: policy.id }))
                }
              >
                <div className="policy-card-left">
                  <div
                    className={`policy-check-circle ${
                      selection.servicePolicyId === policy.id ? "active" : ""
                    }`}
                  >
                    ✓
                  </div>
                  <div className="policy-text-group">
                    <span className="policy-main-name">
                      {getServiceTypeName(policy.serviceType)}
                    </span>
                    <span className="policy-sub-info">
                      {policy.standardDuration || policy.duration}분 소요
                    </span>
                  </div>
                </div>

                <div className="policy-card-right">
                  <span className="policy-price-tag">
                    {policy.price
                      ? `${policy.price.toLocaleString()}원`
                      : "현장 확인"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-selection-placeholder">
              {policyStatus === "loading"
                ? "서비스 정보를 불러오는 중입니다..."
                : `${targetSizeText} 사이즈에 해당하는 서비스가 없습니다.`}
            </div>
          )}
        </div>
      </div>

      <button
        className="next-btn"
        onClick={() => dispatch(setStep(2))}
        disabled={!selection.iceMachineId || !selection.servicePolicyId}
      >
        다음 단계 (일정 선택)
      </button>
    </div>
  );
};

export default Step1StoreInfo;
