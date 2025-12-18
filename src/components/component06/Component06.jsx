import React, { useState } from "react";
import "./Component06.css";

const faqList = [
  { question: "제빙기 청소는 얼마나 자주 받아야 하나요?", answer: "일반적으로 제빙기는 3~6개월 주기로 정기적인 청소를 권장드립니다.\n다만 사용량이 많거나 여름철처럼 습도가 높은 환경, 얼음 사용 빈도가 높은 매장의 경우에는 2~3개월에 한 번 정도의 관리가 위생 유지에 더욱 효과적입니다.\n정기적인 청소는 세균 번식과 이물질 축적을 예방하여 위생적인 얼음 품질 유지와 장비 수명 연장에 도움이 됩니다." },
  { question: "제빙기 청소에는 어떤 작업이 포함되나요?", answer: "제빙기 청소 서비스에는 다음과 같은 전문 작업이 포함됩니다.\n\n• 제빙기 내부 분해 후 세척\n• 얼음 생성 부위 및 물이 닿는 모든 라인의 살균·소독\n• 물때, 석회질, 곰팡이 제거\n• 필터 및 배수 상태 점검\n• 청소 후 정상 작동 여부 확인\n\n단순한 겉면 세척이 아닌, 위생과 안전을 고려한 내부 집중 관리가 이루어집니다." },
  { question: "영업 중인 매장에서도 제빙기 청소가 가능한가요?", answer: "네, 가능합니다.\n매장 운영에 지장을 최소화할 수 있도록 영업 중에도 작업이 가능하도록 진행합니다.\n다만 작업 중에는 일시적으로 제빙기 사용이 제한될 수 있으므로, 영업 전·후 시간대 또는 한가한 시간대를 추천드리며, 매장 상황에 맞춰 일정 조율이 가능합니다." },
  { question: "제빙기 청소에는 보통 어느 정도 시간이 소요되나요?", answer: "제빙기의 모델과 오염 상태에 따라 다르지만, 일반적으로 약 1시간에서 2시간 정도 소요됩니다.\n오염도가 심하거나 대형 제빙기의 경우에는 시간이 다소 추가될 수 있으며, 작업 전 현장 상황을 확인한 후 보다 정확한 소요 시간을 안내드립니다." },
  { question: "모든 브랜드와 모델의 제빙기 청소가 가능한가요?", answer: "대부분의 국내·외 주요 브랜드 및 다양한 모델의 제빙기 청소가 가능합니다.\n다만 일부 특수 모델이나 오래된 기종의 경우에는 사전 확인이 필요할 수 있으므로, 예약 시 모델명 또는 사진을 전달해 주시면 보다 정확한 안내가 가능합니다." },
  { question: "제빙기 청소 후 바로 얼음 사용이 가능한가요?", answer: "네, 가능합니다.\n청소 및 살균 작업 후에는 충분한 헹굼과 테스트 과정을 거쳐 바로 사용하실 수 있도록 마무리됩니다.\n초기 얼음 몇 회차는 위생 확인을 위해 배출을 권장드리며, 이후에는 안심하고 얼음 사용이 가능합니다." },
  { question: "제빙기 청소 비용은 어떻게 책정되나요?", answer: "청소 비용은 제빙기의 용량, 모델, 오염 상태, 설치 환경 등을 종합적으로 고려하여 책정됩니다.\n정확한 금액은 견적 상담 페이지 또는 현장 확인 후 안내드리며, 불필요한 추가 비용 없이 투명한 견적 기준으로 안내해 드리고 있습니다." }
];

const Component06 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

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
