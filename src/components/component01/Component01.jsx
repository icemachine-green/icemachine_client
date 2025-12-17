import React from "react";
import './Component01.css';

const Component01 = () => {
  return (
  <div className="component01-container">
  <div className="component01-textwrap">
    <span className="component01-minititle">제빙기 청소 업체</span>
    <span className="component01-title">
      전문가가 관리하면<br />
      얼음이<br />
      달라집니다.
    </span>
    <button className="component01-btn">청소 예약</button>
  </div>
</div>
  );
}

export default Component01;