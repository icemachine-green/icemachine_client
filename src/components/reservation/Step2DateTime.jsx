import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Step2DateTime.css";
import Step2DateTimeSkeleton from "../common/Skeleton/Step2DateTimeSkeleton.jsx"; // 스켈레톤 컴포넌트 임포트

import { fetchAvailabilityThunk } from "../../store/thunks/reservationThunk";
import {
  setStep,
  setReservationTime,
  resetTime, // resetTime 추가
} from "../../store/slices/reservationSlice";

const SERVICE_POLICIES = [
  { id: 1, duration: 60 },
  { id: 2, duration: 60 },
  { id: 3, duration: 120 },
  { id: 4, duration: 60 },
  { id: 5, duration: 60 },
  { id: 6, duration: 120 },
  { id: 7, duration: 180 },
  { id: 8, duration: 60 },
  { id: 9, duration: 120 },
  { id: 10, duration: 180 },
  { id: 11, duration: 240 },
];

const Step2DateTime = () => {
  const dispatch = useDispatch();

  // 리덕스 state에서 loading 상태를 추가로 가져옵니다.
  const { selection, disabledSlots, loading } = useSelector(
    (state) => state.reservation
  );

  // 로컬 상태로 선택된 날짜 관리
  const [selectedDate, setSelectedDate] = useState(
    selection.reservedDate ? new Date(selection.reservedDate) : new Date()
  );

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  // 날짜 선택이 변경될 때 Redux의 시간 정보 초기화
  useEffect(() => {
    dispatch(resetTime());
  }, [selectedDate, dispatch]);

  // 가용 시간 조회 API 호출
  useEffect(() => {
    const startDate = minDate.toLocaleDateString("sv-SE");
    const endDate = maxDate.toLocaleDateString("sv-SE");

    dispatch(
      fetchAvailabilityThunk({
        startDate,
        endDate,
        servicePolicyId: selection.servicePolicyId || 1,
      })
    );
  }, [dispatch, selection.servicePolicyId]);

  const timeOptions = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const dateStr = selectedDate.toLocaleDateString("sv-SE");
  const unavailableTimes = (disabledSlots || [])
    .filter((slot) => slot.date === dateStr)
    .map((slot) => slot.time);

  const currentPolicy = SERVICE_POLICIES.find(
    (p) => p.id === selection.servicePolicyId
  );
  const duration = currentPolicy?.duration || 60;

  const filteredTimes = timeOptions
    .filter((time) => {
      const [hour, min] = time.split(":").map(Number);
      const startMinutes = hour * 60 + min;
      // 18:00 퇴근(1080분) 기준 필터링
      return startMinutes + duration <= 1080;
    })
    .map((time) => ({
      time,
      isBlocked: unavailableTimes.includes(time),
    }));

  const handleTimeClick = (time) => {
    dispatch(setReservationTime({ date: dateStr, time }));
  };

  // --- 스켈레톤 적용 부분 ---
  if (loading) {
    return <Step2DateTimeSkeleton />;
  }
  // -----------------------

  return (
    <div className="step2-container">
      <div className="step2-header">
        <h2>방문 일정 선택</h2>
        <p>
          서비스 소요 시간을 고려하여 18:00까지 작업 가능한 시간만 표시됩니다.
        </p>
      </div>

      <div className="reservation-info-group">
        <label className="step-label">1. 방문 날짜 선택</label>
        <div className="calendar-center-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            formatDay={(locale, date) => date.getDate()}
            calendarType="gregory"
            prev2Label={null}
            next2Label={null}
          />
        </div>
      </div>

      <div className="reservation-info-group">
        <label className="step-label">2. 방문 시간 선택</label>
        <div className="time-grid">
          {filteredTimes.map(({ time, isBlocked }) => {
            const isSelected = selection.serviceStartTime?.includes(time);
            return (
              <button
                key={time}
                type="button"
                disabled={isBlocked}
                className={`time-slot-btn ${isSelected ? "active" : ""} ${
                  isBlocked ? "disabled" : ""
                }`}
                onClick={() => handleTimeClick(time)}
              >
                <span className="time-text">{time}</span>
                <span className={isBlocked ? "status-text" : "status-text-on"}>
                  {isBlocked ? "마감" : "가능"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="step-actions">
        <button className="prev-btn" onClick={() => dispatch(setStep(1))}>
          이전으로
        </button>
        <button
          className="next-btn-main"
          onClick={() => dispatch(setStep(3))}
          disabled={!selection.serviceStartTime}
        >
          선택 완료 (최종 확인)
        </button>
      </div>
    </div>
  );
};

export default Step2DateTime;
