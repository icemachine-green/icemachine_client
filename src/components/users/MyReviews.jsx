import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getMyReviews } from "../../store/thunks/reviewThunk";
// import MyReviewsSkeleton from "../common/Skeleton/MyReviewsSkeleton.jsx"; // 스켈레톤 추가
import "./MyReviews.css";
import "../common/CommonStyles.css";

const MyReviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reviews, page, totalPages, loading } = useSelector(
    (state) => state.reviews
  );
  const [modalReview, setModalReview] = useState(null);

  useEffect(() => {
    dispatch(getMyReviews({ page: 1 }));
  }, [dispatch]);

  const handleDelete = async (reviewId) => {
    if (!window.confirm("리뷰를 삭제하시겠습니까? 삭제 후 복구할 수 없습니다."))
      return;
    try {
      await dispatch(deleteReview(reviewId)).unwrap();
      alert("리뷰가 삭제되었습니다.");
      setModalReview(null);
      dispatch(getMyReviews({ page }));
    } catch (error) {
      alert("삭제에 실패했습니다.");
    }
  };

  // // 로딩 중일 때 스켈레톤 표시
  // if (loading) {
  //   return <MyReviewsSkeleton />;
  // }

  return (
    <div className="my-reviews-wrapper">
      {/* 상단 헤더 */}
      <div className="my-reviews-header-flex">
        <p className="my-reviews-main-title">내 리뷰 내역</p>
        <button
          className="my-reviews-back-btn"
          onClick={() => navigate("/mypage")}
        >
          〈 뒤로 가기
        </button>
      </div>

      <hr className="my-reviews-divider" />

      {/* 리뷰 리스트 영역 */}
      <div className="my-reviews-list-container">
        <p className="my-reviews-total-info">
          총 <strong>{reviews.length}개</strong>의 리뷰를 작성했습니다.
        </p>

        <div className="my-reviews-card-grid">
          {!loading &&
            reviews.map((review) => (
              <div
                key={review.id}
                className="my-reviews-item-card"
                onClick={() => setModalReview(review)}
              >
                <div className="my-reviews-card-top">
                  <div className="my-reviews-stars">
                    {"★".repeat(review.rating)}
                    <span className="my-reviews-stars-empty">
                      {"★".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <span className="my-reviews-item-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="my-reviews-card-middle">
                  <div className="my-reviews-text-content">
                    {review.content ? (
                      <p className="my-reviews-main-text">{review.content}</p>
                    ) : (
                      <p className="my-reviews-empty-text">
                        텍스트 리뷰 없이 별점을 남기셨습니다.
                      </p>
                    )}
                  </div>
                  {review.imageUrl && (
                    <div className="my-reviews-img-thumb">
                      <img src={review.imageUrl} alt="리뷰 썸네일" />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="my-reviews-pagination">
        <button
          disabled={page === 1}
          onClick={() => dispatch(getMyReviews({ page: page - 1 }))}
        >
          이전
        </button>
        <span className="my-reviews-page-indicator">
          <strong>{page}</strong> / {totalPages || 1}
        </span>
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => dispatch(getMyReviews({ page: page + 1 }))}
        >
          다음
        </button>
      </div>

      {/* 상세 모달 */}
      {modalReview && (
        <div
          className="my-reviews-modal-backdrop"
          onClick={() => setModalReview(null)}
        >
          <div
            className="my-reviews-bottom-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="my-reviews-modal-handle"></div>

            <div className="my-reviews-modal-scroll">
              <div className="my-reviews-modal-top">
                <div className="my-reviews-stars big">
                  {"★".repeat(modalReview.rating)}
                </div>
                <span className="my-reviews-modal-date">
                  {new Date(modalReview.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="my-reviews-modal-body">
                <p>{modalReview.content || "별점으로 참여하신 리뷰입니다."}</p>
                {modalReview.imageUrl && (
                  <img
                    src={modalReview.imageUrl}
                    className="my-reviews-modal-img"
                    alt="리뷰 원본"
                  />
                )}
              </div>
            </div>

            <div className="my-reviews-modal-actions">
              <button
                className="my-reviews-del-btn"
                onClick={() => handleDelete(modalReview.id)}
              >
                리뷰 삭제
              </button>
              <button
                className="my-reviews-close-btn"
                onClick={() => setModalReview(null)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;