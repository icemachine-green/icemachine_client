import React from "react";
import "../Skeleton/Skeleton.css"; // 공통 Shimmer 애니메이션 포함
import "../Skeleton/Step3ConfirmSkeleton.css";

const Step3ConfirmSkeleton = () => {
  return (
    <div className="step3-container skeleton-container">
      {/* 헤더 영역 */}
      <div className="step3-header">
        <div className="skeleton-item skeleton-shimmer skeleton-title-center"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-text-center"></div>
      </div>

      {/* 최종 확인 카드 */}
      <div className="confirm-card">
        {/* 매장 정보 섹션 */}
        <div className="confirm-section">
          <div className="skeleton-item skeleton-shimmer skeleton-label-small"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-value-title"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-value-text"></div>
        </div>

        {/* 신청 서비스 섹션 */}
        <div className="confirm-section">
          <div className="skeleton-item skeleton-shimmer skeleton-label-small"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-value-title"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-value-text"></div>
        </div>

        {/* 방문 예정 일시 (하이라이트 섹션) */}
        <div className="confirm-section highlight">
          <div className="skeleton-item skeleton-shimmer skeleton-label-small"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-value-title-blue"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-value-text"></div>
        </div>

        {/* 결제 예정 금액 */}
        <div className="confirm-section total">
          <div className="skeleton-item skeleton-shimmer skeleton-label-small skeleton-center"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-price-large"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-value-text skeleton-center"></div>
        </div>
      </div>

      {/* 정책 안내 영역 */}
      <div className="policy-notice-wrapper">
        <div className="skeleton-item skeleton-shimmer skeleton-policy-line"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-policy-box"></div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="step-actions">
        <div className="skeleton-item skeleton-shimmer skeleton-btn-prev"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-btn-next"></div>
      </div>
    </div>
  );
};

export default Step3ConfirmSkeleton;