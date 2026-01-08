import React from "react";
import "../Skeleton/Component02Skeleton.css";
import "../Skeleton/Skeleton.css"; // 공통 Shimmer 애니메이션

const Component02Skeleton = () => {
  return (
    <div className="component02-container skeleton-container">
      <div className="component02-text">
        {/* 타이틀 스켈레톤 */}
        <div className="skeleton-item skeleton-shimmer skeleton-c02-title"></div>
        
        {/* 구분선 스켈레톤 */}
        <div className="skeleton-item skeleton-shimmer skeleton-c02-separator"></div>
        
        {/* 본문 스켈레톤 (2줄) */}
        <div className="skeleton-c02-paragraph-group">
          <div className="skeleton-item skeleton-shimmer skeleton-c02-line"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-c02-line half"></div>
        </div>
      </div>

      {/* 이미지 스켈레톤 */}
      <div className="skeleton-item skeleton-shimmer skeleton-c02-image"></div>
    </div>
  );
};

export default Component02Skeleton;