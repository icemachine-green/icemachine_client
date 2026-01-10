import React from 'react';
import '../Skeleton/Skeleton.css'; // 공통 Shimmer 애니메이션
import '../Skeleton/MyProfileSkeleton.css';

const MyProfileSkeleton = () => {
  return (
    <div className="my-profile-container skeleton-container">
      {/* 헤더 스켈레톤 */}
      <div className="my-profile-head">
        <div className="skeleton-item skeleton-shimmer skeleton-profile-back-btn"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-profile-head-title"></div>
      </div>

      {/* 가로선 */}
      <hr className="my-profile-underline" />

      {/* 정보 카드 스켈레톤 */}
      <div className="my-profile-card-container">
        {[1, 2, 3].map((item) => (
          <div className="my-profile-card skeleton-profile-card" key={item}>
            {/* 라벨 (이름, 전화번호 등) */}
            <div className="skeleton-item skeleton-shimmer skeleton-profile-label"></div>
            
            {/* 정보 텍스트 영역 */}
            <div className="my-profile-card-input">
              <div className="skeleton-item skeleton-shimmer skeleton-profile-value"></div>
              {/* 변경 버튼 */}
              <div className="skeleton-item skeleton-shimmer skeleton-profile-change-btn"></div>
            </div>
          </div>
        ))}
      </div>

      {/* 탈퇴 버튼 스켈레톤 */}
      <div className="my-profile-btn-container">
        <div className="skeleton-item skeleton-shimmer skeleton-profile-withdraw-btn"></div>
      </div>
    </div>
  );
};

export default MyProfileSkeleton;