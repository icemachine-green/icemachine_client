import React from "react";
import "../Skeleton/Component01Skeleton.css";
import "../Skeleton/Skeleton.css"; // 공통 애니메이션 불러오기

const Component01Skeleton = () => {
  return (
    <div className="component01-container skeleton-container">
      <div className="component01-textwrap">
        {/* 미니 타이틀 스켈레톤 */}
        <div className="skeleton-item skeleton-shimmer skeleton-minititle"></div>
        
        {/* 메인 타이틀 스켈레톤 (3줄 분량) */}
        <div className="skeleton-title-group">
          <div className="skeleton-item skeleton-shimmer skeleton-title-line"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-title-line"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-title-line half"></div>
        </div>
        
        {/* 버튼 스켈레톤 */}
        <div className="skeleton-item skeleton-shimmer skeleton-btn"></div>
      </div>
    </div>
  );
};

export default Component01Skeleton;