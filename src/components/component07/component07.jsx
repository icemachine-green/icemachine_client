import React from "react";
import "./component07.css";

export default function Component07() {
  const handleReserveClick = () => {
    // TODO: 예약 페이지 만들면 아래 alert 대신 라우팅으로 바꾸면 돼.
    // 예) const navigate = useNavigate();  navigate("/reservation");
    alert(
      "청소 예약 페이지는 아직 연결되지 않았어요!\n예약 페이지를 만들고 라우터에 경로를 추가한 뒤 연결하면 됩니다."
    );
  };

  return (
    <section className="component07-background">
      <div className="component07-content">
        <h2 className="component07-title">청소 예약</h2>
        <div className="component07-separator-bar" />

        <button
          type="button"
          className="component07-button"
          onClick={handleReserveClick}
        >
          청소 예약
        </button>
      </div>
    </section>
  );
}
