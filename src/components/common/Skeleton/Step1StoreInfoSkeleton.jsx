import React from "react";
import "../Skeleton/Step1StoreInfoSkeleton.css";
import "../Skeleton/Skeleton.css";

const Step1StoreInfoSkeleton = () => {
  return (
    <div className="step1-container skeleton-container">
      {/* 1. 매장 상세 정보 영역 */}
      <div className="reservation-info-group">
        <div className="label-with-action">
          <div className="skeleton-item skeleton-shimmer skeleton-label"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-small-btn"></div>
        </div>
        <div className="info-box-display skeleton-box">
          <div className="skeleton-item skeleton-shimmer skeleton-line-m"></div>
        </div>
      </div>

      {/* 2. 제빙기 선택 섹션 */}
      <div className="reservation-info-group">
        <div className="skeleton-item skeleton-shimmer skeleton-label"></div>
        <div className="machine-selection-list">
          {[1, 2].map((i) => (
            <div key={i} className="machine-card skeleton-card">
              <div className="skeleton-item skeleton-shimmer skeleton-line-m" style={{ marginBottom: '15px' }}></div>
              <div className="skeleton-item skeleton-shimmer skeleton-line-s"></div>
              <div className="skeleton-item skeleton-shimmer skeleton-line-s" style={{ marginTop: '8px' }}></div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 서비스 종류 선택 섹션 */}
      <div className="reservation-info-group">
        <div className="skeleton-item skeleton-shimmer skeleton-label"></div>
        <div className="policy-selection-list">
          {[1, 2, 3].map((i) => (
            <div key={i} className="policy-card-item skeleton-card-wide">
              <div className="policy-card-left">
                <div className="skeleton-item skeleton-shimmer skeleton-circle"></div>
                <div className="policy-text-group">
                  <div className="skeleton-item skeleton-shimmer skeleton-line-m"></div>
                  <div className="skeleton-item skeleton-shimmer skeleton-line-s" style={{ marginTop: '5px' }}></div>
                </div>
              </div>
              <div className="skeleton-item skeleton-shimmer skeleton-line-xs"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 다음 단계 버튼 */}
      <div className="skeleton-item skeleton-shimmer skeleton-next-btn"></div>
    </div>
  );
};

export default Step1StoreInfoSkeleton;