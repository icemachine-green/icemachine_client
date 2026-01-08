import React, { useState } from "react";
import "./Component06.css";
import Component06Skeleton from "../common/Skeleton/Component06Skeleton.jsx";

const faqList = [
  { question: "제빙기 청소는 얼마나 자주 받아야 하나요?", answer: "일반적으로 제빙기는 3~6개월 주기로 정기적인 청소를 권장드립니다..." },
  { question: "제빙기 청소에는 어떤 작업이 포함되나요?", answer: "제빙기 청소 서비스에는 다음과 같은 전문 작업이 포함됩니다..." },
  { question: "영업 중인 매장에서도 제빙기 청소가 가능한가요?", answer: "네, 가능합니다..." },
  { question: "제빙기 청소에는 보통 어느 정도 시간이 소요되나요?", answer: "제빙기의 모델과 오염 상태에 따라 다르지만 보통 1~2시간 소요됩니다." },
  { question: "모든 브랜드와 모델의 제빙기 청소가 가능한가요?", answer: "대부분의 국내·외 주요 브랜드 및 다양한 모델의 청소가 가능합니다." },
  { question: "제빙기 청소 후 바로 얼음 사용이 가능한가요?", answer: "네, 가능합니다..." },
  { question: "제빙기 청소 비용은 어떻게 책정되나요?", answer: "청소 비용은 용량, 모델 등을 고려하여 책정됩니다." }
];

const Component06 = ({ isLoading }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  // 1. 로딩 중일 때는 스켈레톤 반환
  if (isLoading) {
    return <Component06Skeleton />;
  }

  // 2. 로딩 완료 시 실제 UI 반환
  return (
    <div className="component06-container">
      <div className="component06-title-container">
        <h1 className="component06-title">FAQ</h1>
        <div className="component06-separator-bar"></div>
      </div>

      <div className="component06-btn-container">
        {faqList.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div className="component06-faq-item" key={index}>
              <button className="component06-toggle-btn" onClick={() => toggleAnswer(index)}>
                <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
                {item.question}
              </button>
              {isOpen && (
                <p className="component06-toggle-answer">{item.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Component06;