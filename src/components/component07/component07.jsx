import React from "react";
import "./component07.css";
import { useNavigate } from "react-router-dom";

export default function Component07() {
  const navigate = useNavigate();

  const redirectReservation = () => {
    navigate("/reservation");
  };

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
