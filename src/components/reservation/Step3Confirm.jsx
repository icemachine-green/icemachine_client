/**
 * @file Step3Confirm.jsx
 * @description 제빙기 섹션 독립 분리 및 데이터 항목 최적화 완료 버전
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../store/slices/reservationSlice";
import { createReservationThunk } from "../../store/thunks/reservationThunk";
import "./Step3Confirm.css";

const Step3Confirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. 리덕스 데이터 추출
  const { businessDetail } = useSelector((state) => state.business);
  const { icemachinesList } = useSelector((state) => state.icemachine);
  const { selection } = useSelector((state) => state.reservation);
  const { items: policies } = useSelector(
    (state) => state.servicePolicy || { items: [] }
  );

  // 2. 매핑 데이터 (선택된 제빙기 및 정책)
  const selectedMachine = icemachinesList?.find(
    (m) => m.id === selection.iceMachineId
  );
  const selectedPolicy = policies.find(
    (p) => p.id === selection.servicePolicyId
  );

  // 서비스 타입 한글 변환
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

  // 🚩 요구사항 4: 한국어 일시 포맷팅 (00분 제외)
  const formatKoreanDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "-";
    try {
      const [datePart, timePart] = dateTimeStr.split(" ");
      const dateObj = new Date(datePart.replace(/-/g, "/"));
      const month = dateObj.getMonth() + 1;
      const date = dateObj.getDate();
      const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
      const dayName = weekDays[dateObj.getDay()];

      const timeMatch = timePart.match(/(\d{2}):(\d{2})/);
      const hour = parseInt(timeMatch[1], 10);
      const ampm = hour < 12 ? "오전" : "오후";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;

      return `${month}월 ${date}일(${dayName}) ${ampm} ${displayHour}시`;
    } catch (e) {
      return dateTimeStr;
    }
  };

  const isImmediateNoCancel = () => {
    if (!selection.serviceStartTime) return false;
    const startTimeStr = selection.serviceStartTime.replace(/-/g, "/");
    const start = new Date(startTimeStr);
    const now = new Date();
    const diffInHours = (start - now) / (1000 * 60 * 60);
    return diffInHours < 24;
  };

  const handleFinalSubmit = async () => {
    if (!window.confirm("입력하신 정보로 예약을 확정하시겠습니까?")) return;

    try {
      const reservedDate = selection.serviceStartTime.split(" ")[0];
      const durationMinutes =
        selectedPolicy?.standardDuration || selectedPolicy?.duration || 60;
      const startTimeStr = selection.serviceStartTime.replace(/-/g, "/");
      const start = new Date(startTimeStr);
      const end = new Date(start.getTime() + durationMinutes * 60000);

      const formatToFullStr = (date) => {
        const pad = (n) => String(n).padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
          date.getDate()
        )} ${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
      };

      const finalData = {
        businessId: businessDetail.id,
        iceMachineId: selection.iceMachineId,
        servicePolicyId: selection.servicePolicyId,
        serviceStartTime: selection.serviceStartTime.includes(":")
          ? selection.serviceStartTime
          : selection.serviceStartTime + ":00",
        reservedDate: reservedDate,
        serviceEndTime: formatToFullStr(end),
      };

      await dispatch(createReservationThunk(finalData)).unwrap();
      alert("예약이 성공적으로 완료되었습니다!");
      navigate("/mypage/reservations");
    } catch (error) {
      alert(`오류가 발생했습니다: ${error.message || "다시 시도해주세요."}`);
    }
  };

  return (
    <div className="step3-container">
      <div className="step3-header">
        <h2>최종 예약 확인</h2>
        <p>선택하신 내용을 마지막으로 확인해 주세요.</p>
      </div>

      <div className="confirm-card">
        {/* 1. 방문 매장 섹션 */}
        <div className="confirm-section">
          <label>방문 매장</label>
          <div className="confirm-value">
            <strong>{businessDetail?.name || "매장 정보 없음"}</strong>
            <span>
              {businessDetail?.mainAddress} {businessDetail?.detailedAddress}
            </span>
          </div>
        </div>

        {/* 🚩 2. 대상 제빙기 섹션 (독립 분리) */}
        <div className="confirm-section">
          <label>서비스 대상 제빙기</label>
          <div className="confirm-value">
            <strong>
              {selectedMachine?.fullModelName || selectedMachine?.model}
            </strong>
            <span>{selectedMachine.sizeType}</span>
          </div>
        </div>

        {/* 🚩 3. 신청 서비스 섹션 (Type, Note, 소요 시간) */}
        <div className="confirm-section">
          <label>신청 서비스</label>
          <div className="confirm-value">
            <strong>{getServiceTypeName(selectedPolicy?.serviceType)}</strong>
            <span
              style={{
                color: "#64748b",
                marginBottom: "6px",
                lineHeight: "1.5",
              }}
            >
              {selectedPolicy?.note}
            </span>
            <span style={{ fontWeight: "600", color: "#475569" }}>
              예상 소요 시간:{" "}
              {selectedPolicy?.standardDuration || selectedPolicy?.duration}분
            </span>
          </div>
        </div>

        {/* 🚩 4. 방문 예정 일시 (하이라이트 섹션) */}
        <div className="confirm-section highlight">
          <label>방문 예정 일시</label>
          <div className="confirm-value">
            <strong className="text-blue">
              {formatKoreanDateTime(selection.serviceStartTime)}
            </strong>
            <span>배정된 기사님이 해당 시간에 맞춰 방문합니다.</span>
          </div>
        </div>

        {/* 5. 결제 예정 금액 섹션 */}
        <div className="confirm-section total">
          <label>결제 예정 금액</label>
          <div className="confirm-value">
            <strong className="price-text">
              {selectedPolicy?.price
                ? selectedPolicy.price.toLocaleString()
                : "0"}
              원
            </strong>
            <span className="notice">현장 결제 (카드/계좌이체 가능)</span>
          </div>
        </div>
      </div>

      {/* 정책 안내 및 취소 불가 안내 */}
      <div className="policy-notice-wrapper">
        <p className="policy-standard">
          • 예약 취소는 예약 시작 시간 24시간 전까지만 가능합니다.
        </p>
        {isImmediateNoCancel() && (
          <div className="policy-warning-box">
            <p className="warning-title">⚠️ 즉시 취소 불가 안내</p>
            <p className="warning-desc">
              현재 선택하신 일시는 서비스 시작까지 <strong>24시간 미만</strong>
              으로 남았습니다. 확정 후에는{" "}
              <strong>단순 변심으로 인한 취소가 불가능</strong>하오니 신중히
              결정해 주세요.
            </p>
          </div>
        )}
      </div>

      {/* 하단 버튼 액션 */}
      <div className="step-actions">
        <button className="prev-btn" onClick={() => dispatch(setStep(2))}>
          일정 수정
        </button>
        <button className="submit-btn" onClick={handleFinalSubmit}>
          예약 확정하기
        </button>
      </div>
    </div>
  );
};

export default Step3Confirm;
