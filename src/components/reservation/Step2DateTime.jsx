import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Step2DateTime.css";

import { fetchAvailabilityThunk } from "../../store/thunks/reservationThunk";
import {
  setStep,
  setReservationTime,
} from "../../store/slices/reservationSlice";

const Step2DateTime = () => {
  const dispatch = useDispatch();
  const { selection, disabledSlots } = useSelector(
    (state) => state.reservation
  );

  // 로컬 상태: 달력 날짜 제어
  const [selectedDate, setSelectedDate] = useState(
    selection.reservedDate ? new Date(selection.reservedDate) : new Date()
  );

  // 현재 날짜 기준 제한 설정
  const minDate = new Date(); // 오늘 이전 선택 불가
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2); // 2개월 뒤까지만 가능

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
    "18:00",
  ];

  const getFilteredTimes = () => {
    const dateStr = selectedDate.toLocaleDateString("sv-SE");
    const unavailableTimes = disabledSlots
      .filter((slot) => slot.date === dateStr)
      .map((slot) => slot.time);

    return timeOptions.map((time) => ({
      time,
      isBlocked: unavailableTimes.includes(time),
    }));
  };

  const filteredTimes = getFilteredTimes();

  const handleTimeClick = (time) => {
    const dateStr = selectedDate.toLocaleDateString("sv-SE");
    dispatch(setReservationTime({ date: dateStr, time }));
  };

  return (
    <div className="step2-container">
      <div className="step2-header">
        <h2>방문 일정 선택</h2>
        <p>원하시는 날짜와 시간을 선택해 주세요.</p>
      </div>

      <div className="reservation-info-group">
        <label className="step-label">1. 방문 날짜 선택</label>
        <div className="calendar-center-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={minDate}
            maxDate={maxDate} // 2개월 제한 적용
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
            calendarType="gregory"
            prev2Label={null} // 년 단위 이동 삭제 (2개월 내 이동이므로 불필요)
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
                {isBlocked ? (
                  <span className="status-text">마감</span>
                ) : (
                  <span className="status-text-on">가능</span>
                )}
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
