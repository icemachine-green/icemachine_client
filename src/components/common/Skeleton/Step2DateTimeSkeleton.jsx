import React from "react";
import "../Skeleton/Skeleton.css"; // 공통 애니메이션 포함된 파일
import "../Skeleton/Step2DateTimeSkeleton.css";

const Step2DateTimeSkeleton = () => {
  return (
    <div className="step2-container skeleton-container">
      {/* 헤더 영역 */}
      <div className="step2-header">
        <div className="skeleton-item skeleton-shimmer skeleton-title-center"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-text-center"></div>
      </div>

      {/* 1. 날짜 선택 섹션 (달력 형태) */}
      <div className="reservation-info-group">
        <div className="skeleton-item skeleton-shimmer skeleton-label"></div>
        <div className="calendar-center-wrapper">
          <div className="skeleton-item skeleton-shimmer skeleton-calendar-box"></div>
        </div>
      </div>

      {/* 2. 시간 선택 섹션 (그리드 형태) */}
      <div className="reservation-info-group">
        <div className="skeleton-item skeleton-shimmer skeleton-label"></div>
        <div className="time-grid">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="skeleton-item skeleton-shimmer skeleton-time-slot"></div>
          ))}
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="step-actions">
        <div className="skeleton-item skeleton-shimmer skeleton-btn-prev"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-btn-next"></div>
      </div>
    </div>
  );
};

export default Step2DateTimeSkeleton;