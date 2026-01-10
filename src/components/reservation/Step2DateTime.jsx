/**
 * @file Step2DateTime.jsx
 * @description 방문 일정 선택 (DB에서 가져온 정책 소요시간 적용)
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Step2DateTime.css";
import Step2DateTimeSkeleton from "../common/Skeleton/Step2DateTimeSkeleton.jsx";

import { fetchAvailabilityThunk } from "../../store/thunks/reservationThunk";
import {
  setStep,
  setReservationTime,
  resetTime,
} from "../../store/slices/reservationSlice";

const Step2DateTime = () => {
  const dispatch = useDispatch();

  // 1. Redux에서 정책(policies)과 예약 상태 가져오기
  const { items: policies } = useSelector(
    (state) => state.servicePolicy || { items: [] }
  );
  const { selection, disabledSlots, loading } = useSelector(
    (state) => state.reservation
  );

  const [selectedDate, setSelectedDate] = useState(
    selection.reservedDate ? new Date(selection.reservedDate) : new Date()
  );

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  // 날짜 변경 시 리덕스 시간 초기화
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

  // 🚩 [수정 포인트] 가짜 리스트 대신 DB에서 가져온 policies에서 현재 선택된 정책 찾기
  const currentPolicy = policies.find(
    (p) => p.id === selection.servicePolicyId
  );

  // 🚩 DB 필드명에 따라 duration 혹은 standardDuration 사용 (사장님 DB 필드명 확인)
  const duration =
    currentPolicy?.standardDuration || currentPolicy?.duration || 60;

  console.log(`⏱️ [Step2 검증] 선택된 정책 소요시간: ${duration}분`);

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

  if (loading) {
    return <Step2DateTimeSkeleton />;
  }

  return (
    <div className="step2-container">
      <div className="step2-header">
        <h2>방문 일정 선택</h2>
        <p>
          서비스 소요 시간({duration}분)을 고려하여 18:00까지 작업 가능한 시간만
          표시됩니다.
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
