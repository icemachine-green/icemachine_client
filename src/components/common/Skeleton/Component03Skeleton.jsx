import React from "react";
import "../Skeleton/Component03Skeleton.css";
import "../Skeleton/Skeleton.css"; // 공통 Shimmer 애니메이션

const Component03Skeleton = () => {
  return (
    <div className="component03-background skeleton-container">
      <div className="component03-content-wrapper">
        {/* 타이틀 스켈레톤 */}
        <div className="skeleton-item skeleton-shimmer skeleton-c03-title"></div>

        {/* 구분선 스켈레톤 */}
        <div className="skeleton-item skeleton-shimmer skeleton-c03-separator"></div>

        {/* 스텝 카드 그룹 */}
        <div className="component03-steps-container">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="component03-step-box">
              {/* 이미지 영역 스켈레톤 */}
              <div className="skeleton-item skeleton-shimmer skeleton-c03-image"></div>
              
              {/* 번호 + 텍스트 영역 스켈레톤 */}
              <div className="component03-step-text-container">
                <div className="skeleton-item skeleton-shimmer skeleton-c03-number"></div>
                <div className="skeleton-item skeleton-shimmer skeleton-c03-text"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Component03Skeleton;