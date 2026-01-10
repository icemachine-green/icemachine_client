import React from 'react';
import '../Skeleton/Skeleton.css';
import '../Skeleton/MyStoresSkeleton.css';

const MyStoresSkeleton = () => {
  return (
    <div className="my-stores-container skeleton-container">
      {/* 헤더 스켈레톤 */}
      <div className="my-stores-head">
        <div className="skeleton-item skeleton-shimmer skeleton-stores-back-btn"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-stores-head-title"></div>
      </div>

      {/* 가로선 */}
      <hr className="my-stores-underline" />

      {/* 매장 추가 버튼 스켈레톤 */}
      <div className="my-stores-add-btn-container">
        <div className="skeleton-item skeleton-shimmer skeleton-stores-add-btn"></div>
      </div>

      {/* 매장 카드 리스트 스켈레톤 (PC 기준 3개 표시) */}
      <div className="my-stores-card-list">
        {[1, 2, 3].map((item) => (
          <div className="my-stores-card skeleton-stores-card" key={item}>
            {/* 이미지 영역 */}
            <div className="my-stores-card-img-container">
              <div className="skeleton-item skeleton-shimmer skeleton-stores-img"></div>
            </div>
            
            {/* 텍스트 정보 영역 */}
            <div className="my-stores-card-info">
              <div className="skeleton-item skeleton-shimmer skeleton-stores-name"></div>
              <div className="skeleton-item skeleton-shimmer skeleton-stores-address"></div>
              <div className="skeleton-item skeleton-shimmer skeleton-stores-phone"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStoresSkeleton;