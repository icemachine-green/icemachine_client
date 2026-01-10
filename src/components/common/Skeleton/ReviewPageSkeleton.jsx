import React from "react";
import "../Skeleton/Skeleton.css"; // 공통 Shimmer 애니메이션
import "../Skeleton/ReviewPageSkeleton.css";

const ReviewPageSkeleton = () => {
  // 초기 로딩 시 보여줄 카드 개수 (ITEMS_PER_PAGE = 6)
  const skeletonCards = Array(6).fill(0);

  return (
    <div className="review-page-container skeleton-container">
      <div className="review-page-sub-container">
        {/* 리뷰 작성 버튼 스켈레톤 */}
        <div className="review-page-write-btn-container">
          <div className="skeleton-item skeleton-shimmer skeleton-write-btn"></div>
        </div>

        {/* 헤더 영역 스켈레톤 */}
        <div className="review-page-head-container">
          <div className="review-page-head-line">
            <div className="skeleton-item skeleton-shimmer skeleton-head-title"></div>
          </div>
        </div>

        {/* 정렬 드롭다운 영역 스켈레톤 */}
        <div className="review-page-sort-container">
          <div className="skeleton-item skeleton-shimmer skeleton-sort-btn"></div>
        </div>

        {/* 리뷰 목록 스켈레톤 */}
        <div className="review-page-box-container">
          {skeletonCards.map((_, index) => (
            <div key={index} className="review-page-box">
              {/* 리뷰 이미지 영역 */}
              <div className="skeleton-item skeleton-shimmer skeleton-review-img"></div>

              <div className="review-page-content">
                <div className="review-page-top">
                  {/* 별점 영역 */}
                  <div className="skeleton-item skeleton-shimmer skeleton-review-stars"></div>
                  {/* 유저 정보 영역 */}
                  <div className="skeleton-item skeleton-shimmer skeleton-review-info"></div>
                </div>

                <hr className="review-page-underline" />

                {/* 리뷰 본문 텍스트 (2줄) */}
                <div className="skeleton-item skeleton-shimmer skeleton-review-text-long"></div>
                <div className="skeleton-item skeleton-shimmer skeleton-review-text-short"></div>

                {/* 퀵 옵션 버튼들 */}
                <div className="review-page-quick-options">
                  <div className="skeleton-item skeleton-shimmer skeleton-quick-tag"></div>
                  <div className="skeleton-item skeleton-shimmer skeleton-quick-tag"></div>
                  <div className="skeleton-item skeleton-shimmer skeleton-quick-tag"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 스켈레톤 */}
        <div className="review-page-more-btn-container">
          <div className="skeleton-item skeleton-shimmer skeleton-more-btn"></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPageSkeleton;