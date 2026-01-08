import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../store/slices/reservationSlice";
import { createReservationThunk } from "../../store/thunks/reservationThunk";
import "./Step3Confirm.css";

const SERVICE_POLICIES = [
  {
    id: 1,
    size: "소형",
    spec: "~50kg",
    name: "소형 제빙기 방문 점검",
    duration: 60,
    price: 30000,
  },
  {
    id: 2,
    size: "소형",
    spec: "~50kg",
    name: "소형 제빙기 기본 청소",
    duration: 60,
    price: 50000,
  },
  {
    id: 3,
    size: "소형",
    spec: "~50kg",
    name: "소형 제빙기 집중 청소",
    duration: 120,
    price: 80000,
  },
  {
    id: 4,
    size: "중형",
    spec: "51~150kg",
    name: "중형 제빙기 방문 점검",
    duration: 60,
    price: 40000,
  },
  {
    id: 5,
    size: "중형",
    spec: "51~150kg",
    name: "중형 제빙기 기본 청소",
    duration: 60,
    price: 60000,
  },
  {
    id: 6,
    size: "중형",
    spec: "51~150kg",
    name: "중형 제빙기 집중 청소",
    duration: 120,
    price: 100000,
  },
  {
    id: 7,
    size: "중형",
    spec: "51~150kg",
    name: "중형 제빙기 프리미엄 청소",
    duration: 180,
    price: 150000,
  },
  {
    id: 8,
    size: "대형",
    spec: "151kg~",
    name: "대형 제빙기 방문 점검",
    duration: 60,
    price: 50000,
  },
  {
    id: 9,
    size: "대형",
    spec: "151kg~",
    name: "대형 제빙기 기본 청소",
    duration: 120,
    price: 100000,
  },
  {
    id: 10,
    size: "대형",
    spec: "151kg~",
    name: "대형 제빙기 집중 청소",
    duration: 180,
    price: 180000,
  },
  {
    id: 11,
    size: "대형",
    spec: "151kg~",
    name: "대형 제빙기 프리미엄 청소",
    duration: 240,
    price: 250000,
  },
];

const Step3Confirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { businessDetail } = useSelector((state) => state.business);
  const { icemachinesList } = useSelector((state) => state.icemachine);
  const { selection } = useSelector((state) => state.reservation);

  const selectedMachine = icemachinesList?.find(
    (m) => m.id === selection.iceMachineId
  );
  const selectedPolicy = SERVICE_POLICIES.find(
    (p) => p.id === selection.servicePolicyId
  );

  // ★ 추가: 24시간 이내 예약인지 확인하는 로직
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
      const durationMinutes = selectedPolicy?.duration || 60;
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
            <strong>{selectedPolicy?.name || "서비스 정보 없음"}</strong>
            <span>
              {selectedMachine?.modelName || selectedMachine?.model} ·{" "}
              {selectedPolicy?.duration}분 소요
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

      {/* ★ 추가: 취소 정책 고지 섹션 */}
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
