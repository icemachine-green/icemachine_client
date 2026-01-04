import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 임포트 확인
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
  const navigate = useNavigate(); // ✅ 철자 확인: navigate

  const { businessDetail } = useSelector((state) => state.business);
  const { icemachinesList } = useSelector((state) => state.icemachine);
  const { selection } = useSelector((state) => state.reservation);

  const selectedMachine = icemachinesList?.find(
    (m) => m.id === selection.iceMachineId
  );
  const selectedPolicy = SERVICE_POLICIES.find(
    (p) => p.id === selection.servicePolicyId
  );

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
      // 1. 날짜만 따로 추출 (reservedDate용)
      const reservedDate = selection.serviceStartTime.split(" ")[0];

      // 2. 종료 시간 계산 (serviceEndTime용)
      // 시작 시간 문자열을 Date 객체로 변환
      const startTimeStr = selection.serviceStartTime.replace(/-/g, "/"); // 호환성을 위한 변환
      const start = new Date(startTimeStr);

      // 선택된 정책의 소요 시간을 가져와서 더해줌 (없으면 기본 60분)
      const durationMinutes = selectedPolicy?.duration || 60;
      const end = new Date(start.getTime() + durationMinutes * 60000);

      // 다시 "YYYY-MM-DD HH:mm:ss" 형식으로 포맷팅
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

        // 🔥 서버가 요구하는 필수 데이터 추가
        reservedDate: reservedDate, // "YYYY-MM-DD"
        serviceEndTime: formatToFullStr(end), // 시작 시간 + duration 계산된 값
      };

      console.log("보내는 데이터:", finalData); // 전송 전 확인용

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
