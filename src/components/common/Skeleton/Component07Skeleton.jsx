import React from "react";
import "../Skeleton/Component07Skeleton.css";
import "../Skeleton/Skeleton.css"; // 공통 Shimmer 애니메이션

const Component07Skeleton = () => {
  return (
    <section className="component07-background skeleton-container">
      <div className="component07-content">
        {/* 제목 스켈레톤 */}
        <div className="skeleton-item skeleton-shimmer skeleton-c07-title"></div>
        
        {/* 구분선 스켈레톤 */}
        <div className="skeleton-item skeleton-shimmer skeleton-c07-separator"></div>

        {/* 큰 버튼 스켈레톤 */}
        <div className="skeleton-item skeleton-shimmer skeleton-c07-button"></div>
      </div>
    </section>
  );
};

export default Component07Skeleton;