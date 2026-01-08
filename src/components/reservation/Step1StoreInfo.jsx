import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep, updateSelection } from "../../store/slices/reservationSlice";
import "./Step1StoreInfo.css";
import Step1StoreInfoSkeleton from "../common/Skeleton/Step1StoreInfoSkeleton.jsx";

const SERVICE_POLICIES = [
  { id: 1, size: "소형", spec: "~50kg", name: "소형 제빙기 방문 점검", duration: 60, price: 30000 },
  { id: 2, size: "소형", spec: "~50kg", name: "소형 제빙기 기본 청소", duration: 60, price: 50000 },
  { id: 3, size: "소형", spec: "~50kg", name: "소형 제빙기 집중 청소", duration: 120, price: 80000 },
  { id: 4, size: "중형", spec: "51~150kg", name: "중형 제빙기 방문 점검", duration: 60, price: 40000 },
  { id: 5, size: "중형", spec: "51~150kg", name: "중형 제빙기 기본 청소", duration: 60, price: 60000 },
  { id: 6, size: "중형", spec: "51~150kg", name: "중형 제빙기 집중 청소", duration: 120, price: 100000 },
  { id: 7, size: "중형", spec: "51~150kg", name: "중형 제빙기 프리미엄 청소", duration: 180, price: 150000 },
  { id: 8, size: "대형", spec: "151kg~", name: "대형 제빙기 방문 점검", duration: 60, price: 50000 },
  { id: 9, size: "대형", spec: "151kg~", name: "대형 제빙기 기본 청소", duration: 120, price: 100000 },
  { id: 10, size: "대형", spec: "151kg~", name: "대형 제빙기 집중 청소", duration: 180, price: 180000 },
  { id: 11, size: "대형", spec: "151kg~", name: "대형 제빙기 프리미엄 청소", duration: 240, price: 250000 },
];

const Step1StoreInfo = ({ isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { businessDetail } = useSelector((state) => state.business);
  const { icemachinesList } = useSelector((state) => state.icemachine);
  const { selection } = useSelector((state) => state.reservation);
  const [showDetail, setShowDetail] = useState(false);

  // 로딩 중일 때는 스켈레톤 반환
  if (isLoading) {
    return <Step1StoreInfoSkeleton />;
  }

  const getSafeSize = (machine) => {
    const rawValue = machine?.sizeType || machine?.size;
    if (!rawValue) return "미지정";
    const val = String(rawValue);
    if (val.includes("소형")) return "소형";
    if (val.includes("중형")) return "중형";
    if (val.includes("대형")) return "대형";
    const upperVal = val.toUpperCase();
    const mapper = { SMALL: "소형", MEDIUM: "중형", LARGE: "대형" };
    return mapper[upperVal] || "기타";
  };

  const getSafeBrand = (machine) => {
    const rawBrand = machine?.modelType || machine?.brand;
    const brands = {
      HOSHIZAKI: "Hoshizaki", SCOTSMAN: "Scotsman", MANITOWOC: "Manitowoc",
      ICE_O_MATIC: "Ice-O-Matic", ETC: "기타", UNKNOWN: "모름",
    };
    return brands[rawBrand?.toUpperCase()] || rawBrand || "기타";
  };

  const selectedMachine = icemachinesList?.find((m) => m.id === selection.iceMachineId);
  const targetSizeText = getSafeSize(selectedMachine);
  const filteredPolicies = SERVICE_POLICIES.filter((p) => p.size === targetSizeText);

  const handleMachineSelect = (id) => {
    dispatch(updateSelection({ iceMachineId: id, servicePolicyId: null }));
  };

  const handlePolicySelect = (id) => {
    dispatch(updateSelection({ servicePolicyId: id }));
  };

  const handleNext = () => {
    if (!selection.iceMachineId || !selection.servicePolicyId) {
      alert("제빙기와 서비스 종류를 선택해주세요.");
      return;
    }
    dispatch(setStep(2));
  };

  return (
    <div className="step1-container">
      <div className="reservation-info-group">
        <div className="label-with-action">
          <label>예약 매장</label>
          <button className="change-store-btn" onClick={() => navigate("/mypage/stores")}>변경</button>
        </div>
        <div className="info-box-display">
          <div className="store-main-info">
            <span className="store-name">{businessDetail?.name || "매장 정보 없음"}</span>
            <button className="toggle-detail-btn" onClick={() => setShowDetail(!showDetail)}>
              {showDetail ? "상세 닫기 ▲" : "매장 상세 ▼"}
            </button>
          </div>
          {showDetail && (
            <div className="store-sub-detail">
              <hr />
              <p><strong>주소:</strong> {businessDetail?.mainAddress} {businessDetail?.detailedAddress}</p>
              <p><strong>매장 연락처:</strong> {businessDetail?.phoneNumber || "정보 없음"}</p>
              <p><strong>담당자:</strong> {businessDetail?.managerName || "정보 없음"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="reservation-info-group">
        <label>점검 제빙기 선택</label>
        <div className="machine-selection-list">
          {icemachinesList?.map((machine) => {
            const isSelected = selection.iceMachineId === machine.id;
            return (
              <div key={machine.id} className={`machine-card ${isSelected ? "selected" : ""}`} onClick={() => handleMachineSelect(machine.id)}>
                <div className="machine-card-header">
                  <span className="machine-model">{machine.modelName || machine.model}</span>
                  {isSelected && <div className="selection-indicator active">✓</div>}
                </div>
                <div className="machine-spec">
                  <div className="spec-item"><span className="spec-label">브랜드</span><span className="spec-value">{getSafeBrand(machine)}</span></div>
                  <div className="spec-item"><span className="spec-label">사이즈</span><span className="spec-value">{getSafeSize(machine)}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="reservation-info-group">
        <label>서비스 종류 선택 {targetSizeText !== "미지정" && <span className="size-badge">{targetSizeText}</span>}</label>
        <div className="policy-selection-list">
          {!selection.iceMachineId ? (
            <div className="no-selection-placeholder">제빙기를 먼저 선택해주세요.</div>
          ) : filteredPolicies.length > 0 ? (
            filteredPolicies.map((policy) => {
              const isSelected = selection.servicePolicyId === policy.id;
              return (
                <div key={policy.id} className={`policy-card-item ${isSelected ? "selected" : ""}`} onClick={() => handlePolicySelect(policy.id)}>
                  <div className="policy-card-left">
                    <div className={`policy-check-circle ${isSelected ? "active" : ""}`}>✓</div>
                    <div className="policy-text-group">
                      <span className="policy-main-name">{policy.name}</span>
                      <span className="policy-sub-info">{policy.spec} · {policy.duration}분 소요</span>
                    </div>
                  </div>
                  <div className="policy-card-right">
                    <span className="policy-price-tag">{policy.price.toLocaleString()}원</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-selection-placeholder">선택하신 사이즈에 대한 서비스 정책을 불러올 수 없습니다.</div>
          )}
        </div>
      </div>

      <button className="next-btn" onClick={handleNext} disabled={!selection.iceMachineId || !selection.servicePolicyId}>
        다음 단계 (일정 선택)
      </button>
    </div>
  );
};

export default Step1StoreInfo;