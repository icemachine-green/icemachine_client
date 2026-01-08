import React from "react";
import "../Skeleton/Component05Skeleton.css";
import "../Skeleton/Skeleton.css"; // 공통 Shimmer 애니메이션

const Component05Skeleton = () => {
  return (
    <div className="component05-background skeleton-container">
      <div className="component05-content-wrapper">
        {/* 헤더 영역 스켈레톤 */}
        <div className="component05-header">
          <div className="component05-header-left">
            <div className="skeleton-item skeleton-shimmer skeleton-c05-title"></div>
            <div className="skeleton-item skeleton-shimmer skeleton-c05-separator"></div>
          </div>
          <div className="skeleton-item skeleton-shimmer skeleton-c05-button"></div>
        </div>

        {/* 리뷰 그리드 스켈레톤 (6개) */}
        <div className="component05-reviews-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="component05-review-box">
              {/* 프로필 이미지 원형 */}
              <div className="skeleton-item skeleton-shimmer skeleton-c05-avatar"></div>
              
              <div className="component05-review-content">
                <div className="component05-review-top">
                  {/* 별점 및 정보 바 */}
                  <div className="skeleton-item skeleton-shimmer skeleton-c05-stars"></div>
                  <div className="skeleton-item skeleton-shimmer skeleton-c05-info"></div>
                </div>
                <hr className="component05-review-underline" />
                {/* 텍스트 두 줄 */}
                <div className="skeleton-item skeleton-shimmer skeleton-c05-text-line"></div>
                <div className="skeleton-item skeleton-shimmer skeleton-c05-text-line half"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Component05Skeleton;