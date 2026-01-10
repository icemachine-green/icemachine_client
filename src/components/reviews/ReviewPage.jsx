import React, { useEffect, useState, useRef } from 'react';
import './ReviewPage.css';
import ReviewWriteModal from './ReviewWriteModal.jsx';
import ReviewPageSkeleton from '../common/Skeleton/ReviewPageSkeleton.jsx'; // 스켈레톤 임포트
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/thunks/reviewThunk.js';

const ITEMS_PER_PAGE = 6;

const ReviewPage = () => {
  const sortRef = useRef(null);
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sort, setSort] = useState("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(getReviews({ sort: "latest" }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  // 로딩 중일 때 스켈레톤 화면 표시
  if (loading) {
    return <ReviewPageSkeleton />;
  }

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

        {/* 정렬 드롭다운 */}
        <div className="review-page-sort-container">
          <div className="review-sort-dropdown" ref={sortRef}>
            <button
              className={`review-sort-button ${isSortOpen ? "active" : ""}`}
              onClick={() => setIsSortOpen((prev) => !prev)}
            >
              {sort === "latest" && "최신순"}
              {sort === "highest" && "평점 높은순"}
              {sort === "lowest" && "평점 낮은순"}
              <span className="review-sort-arrow">▼</span>
            </button>

            {isSortOpen && (
              <ul className="review-sort-menu">
                <li
                  className={sort === "latest" ? "selected" : ""}
                  onClick={() => {
                    handleSortChange("latest");
                    setIsSortOpen(false);
                  }}
                >
                  최신순
                </li>
                <li
                  className={sort === "highest" ? "selected" : ""}
                  onClick={() => {
                    handleSortChange("highest");
                    setIsSortOpen(false);
                  }}
                >
                  평점 높은순
                </li>
                <li
                  className={sort === "lowest" ? "selected" : ""}
                  onClick={() => {
                    handleSortChange("lowest");
                    setIsSortOpen(false);
                  }}
                >
                  평점 낮은순
                </li>
              </ul>
            )}
          </div>
        </div>


        {/* 리뷰 목록 */}
        <div className="review-page-box-container">
          {error && <p>리뷰 조회 중 오류가 발생했습니다.</p>}

          {reviews.slice(0, visibleCount).map((review, index) => (
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
                {review.quickOption && (
                  <div className="review-page-quickoption-section">
                    <div className="review-page-quick-options">
                      {review.quickOption.split(",").map((opt, i) => (
                        <button key={i} className="review-page-quick-option-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 */}
        {visibleCount < reviews.length && (
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