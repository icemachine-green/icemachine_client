import React from "react";
import "../Skeleton/Skeleton.css"; // Shimmer 애니메이션 공통 파일
import "../Skeleton/MyReservationSkeleton.css";

const MyReservationSkeleton = () => {
  // 리스트에 보여줄 스켈레톤 카드 개수 (보통 3~4개)
  const skeletonCards = Array(4).fill(0);

  return (
    <div className="MyReservationPage-div-container skeleton-container">
      {/* 헤더 영역 스켈레톤 */}
      <div className="MyReservationPage-div-head">
        <div className="skeleton-item skeleton-shimmer skeleton-res-back-btn"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-res-title"></div>
      </div>

      <hr className="MyReservationPage-hr-underline" />

      {/* 탭 영역 스켈레톤 */}
      <div className="MyReservationPage-div-tabs-wrapper">
        <div className="MyReservationPage-div-tabs">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="skeleton-item skeleton-shimmer skeleton-res-tab"></div>
          ))}
        </div>
        <div className="skeleton-item skeleton-shimmer skeleton-res-policy-hint"></div>
      </div>

      {/* 예약 리스트 영역 스켈레톤 */}
      <div className="MyReservationPage-div-list">
        {skeletonCards.map((_, index) => (
          <div key={index} className="MyReservationPage-div-card skeleton-card">
            {/* 상단 상태 배지 위치 */}
            <div className="skeleton-item skeleton-shimmer skeleton-res-status-badge"></div>
            
            <div className="MyReservationPage-div-card-info">
              {/* 예약 날짜/시간 */}
              <div className="skeleton-item skeleton-shimmer skeleton-res-card-date"></div>
              {/* 기사 정보 */}
              <div className="skeleton-item skeleton-shimmer skeleton-res-card-engineer"></div>
            </div>

            <div className="MyReservationPage-div-card-actions">
              {/* 버튼 2개 */}
              <div className="skeleton-item skeleton-shimmer skeleton-res-card-btn"></div>
              <div className="skeleton-item skeleton-shimmer skeleton-res-card-btn"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReservationSkeleton;