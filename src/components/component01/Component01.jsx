import React from "react"; 
import './Component01.css';
import { useNavigate } from "react-router-dom";
import Component01Skeleton from "../common/Skeleton/Component01Skeleton.jsx"; 

// 부모 컴포넌트로부터 isLoading 상태를 받아오도록 설정 (props)
const Component01 = ({ isLoading }) => {
  const navigate = useNavigate();

  const redirectReservation = () => {
    navigate("/reservation");
  };

  // 1. 로딩 중일 때는 스켈레톤을 반환
  if (isLoading) {
    return <Component01Skeleton />;
  }

  // 2. 로딩이 끝나면 실제 컨텐츠 반환
  return (
    <div className="component01-container">
      <div className="component01-textwrap">
        <span className="component01-minititle">제빙기 청소 업체</span>
        <span className="component01-title">
          전문가가 관리하면<br />
          얼음이<br />
          달라집니다.
        </span>
        <button className="component01-btn" onClick={redirectReservation}>
          청소 예약
        </button>
      </div>
    </div>
  );
}

export default Component01;