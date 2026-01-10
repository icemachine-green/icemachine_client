import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getBusinessDetailThunk } from "../../store/thunks/businessThunk";
import { getIcemachinesByBusinessIdThunk } from "../../store/thunks/icemachineThunk";
import { fetchServicePoliciesThunk } from "../../store/thunks/servicePolicyThunk";
import { updateSelection, setStep } from "../../store/slices/reservationSlice";

import Step1StoreInfo from "./Step1StoreInfo.jsx";
import Step2DateTime from "./Step2DateTime.jsx";
import Step3Confirm from "./Step3Confirm.jsx";
import "./ReservationPage.css";

const ReservationPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const urlBusinessId = searchParams.get("businessId");
  const currentStep = useSelector((state) => state.reservation.currentStep);

  const { businessDetail } = useSelector((state) => state.business);
  const { icemachinesList } = useSelector((state) => state.icemachine);
  const { selection } = useSelector((state) => state.reservation);
  // 에러 방지용 기본값 설정
  const { items: policies = [] } = useSelector(
    (state) => state.servicePolicy || {}
  );

  useEffect(() => {
    // 페이지 진입 시 정책 데이터 로드
    dispatch(fetchServicePoliciesThunk());

    if (urlBusinessId) {
      const bId = Number(urlBusinessId);
      dispatch(updateSelection({ businessId: bId }));
      dispatch(getBusinessDetailThunk(bId));
      dispatch(getIcemachinesByBusinessIdThunk(bId));
      dispatch(setStep(1));
    }
  }, [dispatch, urlBusinessId]);

  const selectedMachine = icemachinesList?.find(
    (m) => m.id === selection.iceMachineId
  );

  // policies가 비어있을 경우를 대비해 안전하게 참조
  const currentPolicy = Array.isArray(policies)
    ? policies.find((p) => p.id === selection.servicePolicyId)
    : null;

  const getPolicyDisplayName = (policy) => {
    if (!policy) return "미선택";
    const typeMap = {
      VISIT_CHECK: "방문 점검",
      STANDARD_CLEAN: "기본 청소",
      DEEP_CLEAN: "집중 청소",
      PREMIUM_CLEAN: "프리미엄 청소",
      SUBSCRIPTION: "정기 구독",
    };
    return `${policy.sizeType || ""} ${
      typeMap[policy.serviceType] || policy.serviceType || ""
    }`;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1StoreInfo />;
      case 2:
        return <Step2DateTime />;
      case 3:
        return <Step3Confirm />;
      default:
        return <Step1StoreInfo />;
    }
  };

  return (
    <div className="reservationpage-container">
      <div className="reservationpage-img">
        <img src="/icons/blue-ice_1440.png" alt="header" />
      </div>

      <div className="reservationpage-head">
        <p className="reservationpage-head-title">
          제빙기 예약 서비스 ({currentStep}/3)
        </p>
      </div>
      <hr className="reservationpage-underline" />

      <div className="reservationpage-content">
        <div className="step-main-content">{renderStep()}</div>

        <aside className="reservation-summary-side">
          <h3>현재 선택 정보</h3>

          <div className="summary-item">
            <span className="summary-label">방문 매장</span>
            <div className="summary-value">
              {businessDetail?.name || "매장 확인 중..."}
            </div>
          </div>

          <div className="summary-item">
            <span className="summary-label">점검 대상 제빙기</span>
            <div className="summary-value">
              {selectedMachine
                ? selectedMachine.modelName || selectedMachine.model
                : "미선택"}
            </div>
          </div>

          <div className="summary-item">
            <span className="summary-label">신청 서비스</span>
            <div className="summary-value">
              {getPolicyDisplayName(currentPolicy)}
            </div>
          </div>

          {selection.serviceStartTime && (
            <div className="summary-highlight">
              <span
                className="summary-label"
                style={{ color: "#007bff", fontWeight: "bold" }}
              >
                방문 예정 일시
              </span>
              <div
                className="summary-value"
                style={{ color: "#007bff", fontSize: "1rem" }}
              >
                {selection.serviceStartTime}
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: "20px",
              fontSize: "0.75rem",
              color: "#94a3b8",
              lineHeight: "1.5",
            }}
          >
            • 기사님이 예약 시간에 맞춰 방문합니다.
            <br />• 일정 변경/취소는 마이페이지에서 가능합니다.
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ReservationPage;
