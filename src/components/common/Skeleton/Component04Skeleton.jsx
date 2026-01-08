import React from "react";
import "../Skeleton/Component04Skeleton.css";
import "../Skeleton/Skeleton.css"; // 공통 Shimmer 애니메이션

const Component04Skeleton = () => {
  return (
    <div className="component04-background skeleton-container">
      <div className="component04-container">
        {/* 제목 영역 */}
        <div className="component04-text">
          <div className="skeleton-item skeleton-shimmer skeleton-c04-title"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-c04-separator"></div>
        </div>

        {/* Swiper 자리를 대체하는 스켈레톤 박스 */}
        <div className="skeleton-c04-swiper-wrapper">
          <div className="skeleton-c04-slide-content">
            {/* 상단 텍스트 영역 */}
            <div className="skeleton-item skeleton-shimmer skeleton-c04-text-bar"></div>
            {/* 이미지 영역 */}
            <div className="skeleton-item skeleton-shimmer skeleton-c04-image-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component04Skeleton;