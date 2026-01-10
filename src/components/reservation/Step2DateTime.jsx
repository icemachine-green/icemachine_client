/**
 * @file Step2DateTime.jsx
 * @description 방문 일정 선택 (시간 포맷 압축 및 문구 최적화)
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

  const { items: policies } = useSelector(
    (state) => state.servicePolicy || { items: [] }
  );
  const { selection, disabledSlots, loading } = useSelector(
    (state) => state.reservation
  );

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [selectedDate, setSelectedDate] = useState(
    selection.reservedDate ? new Date(selection.reservedDate) : tomorrow
  );

  const minDate = tomorrow;
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  useEffect(() => {
    dispatch(resetTime());
  }, [selectedDate, dispatch]);

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

  const currentPolicy = policies.find(
    (p) => p.id === selection.servicePolicyId
  );
  const duration =
    currentPolicy?.standardDuration || currentPolicy?.duration || 60;

  const filteredTimes = timeOptions
    .filter((time) => {
      const [hour, min] = time.split(":").map(Number);
      return hour * 60 + min + duration <= 1080;
    })
    .map((time) => ({
      time,
      isBlocked: unavailableTimes.includes(time),
    }));

  const handleTimeClick = (time) => {
    dispatch(setReservationTime({ date: dateStr, time }));
  };

  const isWeekend = ({ date, view }) => {
    if (view === "month") return date.getDay() === 0 || date.getDay() === 6;
  };

  // --- 🚩 [개선] 00분 제거 및 압축 포맷 ---
  const formatKoreanTime = (fullStr) => {
    if (!fullStr) return "";
    const timeMatch = fullStr.match(/(\d{2}):(\d{2})/);
    if (!timeMatch) return fullStr;

    const hour = parseInt(timeMatch[1], 10);
    const ampm = hour < 12 ? "오전" : "오후";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${ampm} ${displayHour}시`; // "분" 제거하여 깔끔하게 표시
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = weekDays[selectedDate.getDay()];
  const month = selectedDate.getMonth() + 1;
  const date = selectedDate.getDate();
  const displayTime = formatKoreanTime(selection.serviceStartTime);

  if (loading) return <Step2DateTimeSkeleton />;

  return (
    <div className="Step2DateTime-container">
      <div className="Step2DateTime-header">
        <h2 className="Step2DateTime-h2">방문 일정 선택</h2>
        <div className="Step2DateTime-duration-badge">
          예상 소요 시간: <strong>{duration}분</strong>
        </div>
        <p className="Step2DateTime-p-guide">
          주말 및 공휴일 휴무 / 당일 예약 불가
        </p>
      </div>

      <div className="Step2DateTime-group">
        <label className="Step2DateTime-label">1. 방문 날짜 선택</label>
        <div className="Step2DateTime-calendar-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            formatDay={(locale, date) => date.getDate()}
            calendarType="gregory"
            prev2Label={null}
            next2Label={null}
            tileDisabled={isWeekend}
          />
        </div>
      </div>

      <div className="Step2DateTime-group">
        <label className="Step2DateTime-label">2. 방문 시간 선택</label>
        <div className="Step2DateTime-time-grid">
          {filteredTimes.map(({ time, isBlocked }) => {
            const isSelected = selection.serviceStartTime?.includes(time);
            return (
              <button
                key={time}
                type="button"
                disabled={isBlocked}
                className={`Step2DateTime-time-btn ${
                  isSelected ? "active" : ""
                } ${isBlocked ? "disabled" : ""}`}
                onClick={() => handleTimeClick(time)}
              >
                <span className="Step2DateTime-time-text">{time}</span>
                <span className="Step2DateTime-status-text">
                  {isBlocked ? "마감" : "가능"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="Step2DateTime-actions">
        <button
          className="Step2DateTime-prev-btn"
          onClick={() => dispatch(setStep(1))}
        >
          이전으로
        </button>
        <button
          className="Step2DateTime-next-btn"
          onClick={() => dispatch(setStep(3))}
          disabled={!selection.serviceStartTime}
        >
          {selection.serviceStartTime
            ? `${month}월 ${date}일(${dayName}) ${displayTime}`
            : "방문 시간을 선택해주세요"}
        </button>
      </div>
    </div>
  );
};

export default Step2DateTime;
