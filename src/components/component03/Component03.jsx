import React from "react"; 
import "./Component03.css";
import Component03Skeleton from "../common/Skeleton/Component03Skeleton.jsx";

const serviceSteps = [
  {
    number: 1,
    image: "/icons/service_img1.png",
    text: "간편 예약",
  },
  {
    number: 2,
    image: "/icons/service_img2.png",
    text: "기사 배정",
  },
  {
    number: 3,
    image: "/icons/service_img3.png",
    text: "작업 착수",
  },
  {
    number: 4,
    image: "/icons/service_img4.png",
    text: "작업 종료",
  },
];

// props로 isLoading을 전달받는 구조로 변경
const Component03 = ({ isLoading }) => {
  
  // 1. 로딩 중일 때는 스켈레톤을 반환
  if (isLoading) {
    return <Component03Skeleton />;
  }

  // 2. 로딩이 끝나면 실제 컨텐츠 반환
  return (
    <div className="component03-background">
      <div className="component03-content-wrapper">
        <h1 className="component03-title">서비스 흐름 소개</h1>

        <div className="component03-separator-bar"></div>

        <div className="component03-steps-container">
          {serviceSteps.map((step) => (
            <div key={step.number} className="component03-step-box">
              <img
                src={step.image}
                alt={step.text}
                className="component03-step-image"
              />

              <div className="component03-step-text-container">
                <span className="component03-step-number">{step.number}</span>
                <span className="component03-step-text">{step.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Component03;
