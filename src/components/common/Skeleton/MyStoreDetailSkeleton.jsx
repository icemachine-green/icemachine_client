import React from "react";
import "../Skeleton/Skeleton.css";
import "../Skeleton/MyStoreDetailSkeleton.css";

const MyStoreDetailSkeleton = () => {
  return (
    <div className="my-store-detail-container skeleton-container">
      {/* 헤더 스켈레톤 */}
      <div className="my-store-detail-head">
        <div className="skeleton-item skeleton-shimmer skeleton-detail-back-btn"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-detail-head-title"></div>
      </div>

      <hr className="my-store-detail-underline" />

      {/* 메인 정보 박스 스켈레톤 */}
      <div className="my-store-detail-content skeleton-detail-content">
        {/* 우측 상단 수정 버튼 위치 */}
        <div className="skeleton-item skeleton-shimmer skeleton-detail-edit-btn"></div>

        {/* 매장명 */}
        <div className="skeleton-item skeleton-shimmer skeleton-detail-name"></div>

        {/* 상세 정보 텍스트 3줄 (주소, 연락처, 담당자) */}
        <div className="skeleton-item skeleton-shimmer skeleton-detail-text"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-detail-text"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-detail-text"></div>

        {/* 제빙기 섹션 헤더 */}
        <div className="icemachine-list-header">
          <div className="skeleton-item skeleton-shimmer skeleton-detail-subtitle"></div>
          <div className="skeleton-item skeleton-shimmer skeleton-detail-add-btn"></div>
        </div>

        {/* 제빙기 아이템 리스트 (기본 1개 표시) */}
        <div className="icemachine-list">
          {[1].map((item) => (
            <div key={item} className="icemachine-detail-item skeleton-ice-item">
              <div className="skeleton-item skeleton-shimmer skeleton-ice-text-long"></div>
              <div className="skeleton-item skeleton-shimmer skeleton-ice-text-short"></div>
              <div className="skeleton-item skeleton-shimmer skeleton-ice-action-btn"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 스켈레톤 */}
      <div className="my-store-detail-bottom-actions">
        <div className="skeleton-item skeleton-shimmer skeleton-detail-bottom-btn"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-detail-bottom-btn"></div>
      </div>
    </div>
  );
};

export default MyStoreDetailSkeleton;