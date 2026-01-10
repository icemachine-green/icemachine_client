import React from "react";
import "../Skeleton/Skeleton.css";
import "../Skeleton/MyReviewsSkeleton.css";

const MyReviewsSkeleton = () => {
  // 보통 한 페이지에 5~10개의 리뷰가 보이므로 5개 행을 생성합니다.
  const skeletonRows = Array(5).fill(0);

  return (
    <div className="my-stores-container skeleton-container">
      {/* 헤더 영역 */}
      <div className="my-stores-head">
        <div className="skeleton-item skeleton-shimmer skeleton-reviews-back-btn"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-reviews-head-title"></div>
      </div>

      <hr className="my-stores-underline" />

      {/* 리뷰 테이블 스켈레톤 */}
      <div className="my-reviews-table-container">
        <div className="skeleton-item skeleton-shimmer skeleton-reviews-hint"></div>
        <table className="my-reviews-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>리뷰 내용</th>
              <th>별점</th>
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, index) => (
              <tr key={index}>
                <td>
                  <div className="skeleton-item skeleton-shimmer skeleton-reviews-date"></div>
                </td>
                <td>
                  <div className="skeleton-item skeleton-shimmer skeleton-reviews-content-line"></div>
                </td>
                <td>
                  <div className="skeleton-item skeleton-shimmer skeleton-reviews-stars"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 스켈레톤 */}
      <div className="my-reviews-pagination">
        <div className="skeleton-item skeleton-shimmer skeleton-reviews-page-btn"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-reviews-page-info"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-reviews-page-btn"></div>
      </div>
    </div>
  );
};

export default MyReviewsSkeleton;