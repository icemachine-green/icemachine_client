import React, { useEffect, useState } from 'react';
import './ReviewPage.css';
import ReviewWriteModal from './ReviewWriteModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/thunks/reviewThunk.js';

const ITEMS_PER_PAGE = 6;

const ReviewPage = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sort, setSort] = useState("latest");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(getReviews({ sort: "latest" }));
  }, []);

  // 정렬 버튼 클릭 핸들러
  const handleSortChange = (nextSort) => {
    if (sort === nextSort) return;

    setSort(nextSort);
    setVisibleCount(ITEMS_PER_PAGE);   // UI 상태 초기화
    dispatch(getReviews({ sort: nextSort })); // 명시적 재요청
  };

  // 더보기
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="review-page-container">
      <div className="review-page-sub-container">
        <div className="review-page-write-btn-container">
          <button className="review-page-write-btn" onClick={() => setIsModalOpen(true)}>리뷰 작성</button>
        </div>

        {/* 헤더 영역 */}
        <div className="review-page-head-container">
          <div className="review-page-head-line">
              <div className="review-page-head-sub-container">
                <span className="review-page-head-text">실제 고객님들의 </span>
                <span className="review-page-head-stars">★★★★★</span>
              </div>
              <span className="review-page-head-title">REAL REVIEW</span>
          </div>
        </div>

        {/* 정렬 버튼 */}
        <div className="review-page-sort-container">
          <button className={`review-page-latest-btn ${sort === "latest" ? "active" : ""}`}
          onClick={() => handleSortChange("latest")}>최신순</button>
          <button className={`review-page-rating-btn ${sort === "highest" ? "active" : ""}`}
          onClick={() => handleSortChange("highest")}>별점순</button>
        </div>

        {/* 리뷰 목록 */}
        <div className="review-page-box-container">
          {loading && <p>리뷰를 불러오는 중입니다...</p>}
          {error && <p>리뷰 조회 중 오류가 발생했습니다.</p>}

          {!loading &&
            reviews.slice(0, visibleCount).map((review, index) => (
              <div key={index} className="review-page-box">
                {review.imageUrl && (
                  <img
                    src={review.imageUrl}
                    alt="review"
                    className="review-page-image"
                  />
                )}

                <div className="review-page-content">
                  <div className="review-page-top">
                    <span className="review-page-stars">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                    <span className="review-page-info">
                      {review.user_name} | {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <hr className="review-page-underline" />

                  {review.content && (
                    <p className="review-page-text">{review.content}</p>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* 더보기 */}
        {!loading && visibleCount < reviews.length && (
          <div className="review-page-more-btn-container">
            <button className="review-page-more-btn" onClick={handleLoadMore}>더 보기</button>
          </div>
        )}
        
        {isModalOpen && (<ReviewWriteModal onClose={() => setIsModalOpen(false)} />)}

      </div>
    </div>
  );
};

export default ReviewPage;
