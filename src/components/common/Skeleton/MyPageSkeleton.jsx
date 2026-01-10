import React from "react";
import "../Skeleton/Skeleton.css"; // 공통 Shimmer 애니메이션
import "../Skeleton/MyPageSkeleton.css";

const MyPageSkeleton = () => {
  // 마이페이지의 카드 개수 (예약, 정보변경, 매장정보, 리뷰내역, 로그아웃)
  const skeletonCards = Array(5).fill(0);

  return (
    <div className="my-page-container skeleton-container">
      {/* 헤더 스켈레톤 */}
      <div className="my-page-head">
        <div className="skeleton-item skeleton-shimmer skeleton-mypage-head-text"></div>
      </div>

      {/* 가로선 */}
      <hr className="my-page-underline" />

      {/* 카드 영역 스켈레톤 */}
      <div className="my-page-card-container">
        {skeletonCards.map((_, index) => (
          <div key={index} className="my-page-card skeleton-card">
            {/* 왼쪽 영역 */}
            <div className="my-page-card-sub-container-1">
              <div className="skeleton-item skeleton-shimmer skeleton-mypage-icon"></div>
              <div className="my-page-card-text">
                <div className="skeleton-item skeleton-shimmer skeleton-mypage-main-text"></div>
              </div>
            </div>

            {/* 오른쪽 영역 (디바이더 + 서브 텍스트) */}
            <div className="my-page-card-sub-container-2">
              <div className="my-page-card-divider skeleton-divider"></div>
              <div className="my-page-card-sub-text">
                <div className="skeleton-item skeleton-shimmer skeleton-mypage-sub-text"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPageSkeleton;