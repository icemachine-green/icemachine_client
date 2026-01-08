import React from "react";
import "./component07.css";
import { useNavigate } from "react-router-dom";
import Component07Skeleton from "../common/Skeleton/Component07Skeleton.jsx";

export default function Component07({ isLoading }) {
  const navigate = useNavigate();

  const redirectReservation = () => {
    navigate("/reservation");
  };

  // 1. 로딩 중일 때는 스켈레톤 반환
  if (isLoading) {
    return <Component07Skeleton />;
  }

  // 2. 로딩 완료 시 실제 컨텐츠 반환
  return (
    <section className="component07-background">
      <div className="component07-content">
        <h2 className="component07-title">청소 예약</h2>
        <div className="component07-separator-bar" />

        <button
          type="button"
          className="component07-button"
          onClick={redirectReservation}
        >
          청소 예약
        </button>
      </div>
    </section>
  );
}
