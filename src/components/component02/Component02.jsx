import React from "react";
import "./Component02.css";
import Component02Skeleton from "../common/Skeleton/Component02Skeleton.jsx";

const Component02 = ({ isLoading }) => {
  if (isLoading) {
    return <Component02Skeleton />;
  }

  return (
    <div className="component02-container">
      <div className="component02-text">
        <h1 className="component02-title">제빙기 케어, 왜 필요할까요?</h1>
        <div className="component02-separator-bar"></div>
        <p className="component02-paragraph">
          "제빙기 청소는 얼음의 위생과 맛을 지키는 기본입니다.
          <br />
          정기적인 관리로 세균 오염을 막고 고객에게 신뢰를 제공합니다."
        </p>
      </div>
      <img
        src="/icons/icecare.png"
        alt="Ice Care Service"
        className="component02-image"
      />
    </div>
  );
};

export default Component02;
