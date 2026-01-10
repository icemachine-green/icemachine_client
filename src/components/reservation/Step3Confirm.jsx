/**
 * @file Step3Confirm.jsx
 * @description DB 연동 및 예약 확정 로직 (404 에러 방지 버전)
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

  // 1. 리덕스에서 필요한 모든 데이터 가져오기
  const { businessDetail } = useSelector((state) => state.business);
  const { icemachinesList } = useSelector((state) => state.icemachine);
  const { selection } = useSelector((state) => state.reservation);
  // 🚩 Step 1에서 불러온 진짜 정책 리스트 사용
  const { items: policies } = useSelector(
    (state) => state.servicePolicy || { items: [] }
  );

  // 2. 선택된 제빙기 및 정책 정보 매핑 (DB 데이터 기반)
  const selectedMachine = icemachinesList?.find(
    (m) => m.id === selection.iceMachineId
  );
  const selectedPolicy = policies.find(
    (p) => p.id === selection.servicePolicyId
  );

  // 서비스 타입 한글 변환 함수
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

  const isImmediateNoCancel = () => {
    if (!selection.serviceStartTime) return false;
    const startTimeStr = selection.serviceStartTime.replace(/-/g, "/");
    const start = new Date(startTimeStr);
    const now = new Date();
    const diffInHours = (start - now) / (1000 * 60 * 60);
    return diffInHours < 24;
  };

  const formatDateTimeFull = (dateTimeStr) => {
    if (!dateTimeStr) return "-";
    try {
      const [date, time] = dateTimeStr.split(" ");
      const [y, m, d] = date.split("-");
      return `${y}년 ${m}월 ${d}일 ${time}`;
    } catch (e) {
      return dateTimeStr;
    }
  };

  const handleFinalSubmit = async () => {
    if (!window.confirm("입력하신 정보로 예약을 확정하시겠습니까?")) return;

    try {
      const reservedDate = selection.serviceStartTime.split(" ")[0];
      const startTimeStr = selection.serviceStartTime.replace(/-/g, "/");
      const start = new Date(startTimeStr);
      // 🚩 DB 필드명에 맞춰 duration 확인
      const durationMinutes =
        selectedPolicy?.standardDuration || selectedPolicy?.duration || 60;
      const end = new Date(start.getTime() + durationMinutes * 60000);

      const formatToFullStr = (date) => {
        const pad = (n) => String(n).padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
          date.getDate()
        )} ${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
      };

      // 🚩 백엔드 DTO 규격에 맞게 전송 데이터 구성
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

      console.log("📤 [최종 제출 데이터]:", finalData);

      await dispatch(createReservationThunk(finalData)).unwrap();
      alert("예약이 성공적으로 완료되었습니다!");
      navigate("/mypage/reservations");
    } catch (error) {
      console.error("❌ 예약 실패 상세:", error);
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
        <div className="confirm-section">
          <label>방문 매장</label>
          <div className="confirm-value">
            <strong>{businessDetail?.name || "매장 정보 없음"}</strong>
            <span>
              {businessDetail?.mainAddress} {businessDetail?.detailedAddress}
            </span>
          </div>
        </div>

        <div className="confirm-section">
          <label>신청 서비스</label>
          <div className="confirm-value">
            {/* 🚩 한글 이름 변환 적용 */}
            <strong>{getServiceTypeName(selectedPolicy?.serviceType)}</strong>
            <span>
              {selectedMachine?.modelName || selectedMachine?.model} ·{" "}
              {selectedPolicy?.standardDuration || selectedPolicy?.duration}분
              소요
            </span>
          </div>
        </div>

        <div className="confirm-section highlight">
          <label>방문 예정 일시</label>
          <div className="confirm-value">
            <strong className="text-blue">
              {formatDateTimeFull(selection.serviceStartTime)}
            </strong>
            <span>배정된 기사님이 해당 시간에 맞춰 방문합니다.</span>
          </div>
        </div>

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
