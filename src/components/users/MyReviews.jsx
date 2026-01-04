import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MyReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getMyReviews } from "../../store/thunks/reviewThunk";

const MyReviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { reviews, page, totalPages, loading } = useSelector((state) => state.reviews);
  const [modalReview, setModalReview] = useState(null);

  function redirectMyPage() {
    return navigate('/mypage');
  }

  useEffect(() => {
    dispatch(getMyReviews({ page: 1 }));
  }, []);

  const openModal = (review) => setModalReview(review);
  const closeModal = () => setModalReview(null);

  const handleDelete = async (reviewId) => {
    const isConfirmed = window.confirm(
      "해당 리뷰를 삭제하시겠습니까?"
    );
    if (!isConfirmed) return;

    try {
      await dispatch(deleteReview(reviewId)).unwrap();
      closeModal();
      alert("리뷰가 삭제되었습니다.");
      dispatch(getMyReviews({ page }));
    } catch (error) {
      console.error("리뷰 삭제에 실패했습니다:", error)
      alert("삭제에 실패했습니다.");
    }
  };

  const handlePageChange = (newPage) => {
    dispatch(getMyReviews({ page: newPage }));
  };
  
  return (
    <div className="my-stores-container"> 
      {/* 상단 : 네미밍은 MyStores 영역과 동일하게 화면을 가져가기 위해 공유하여 사용*/}
      <div className="my-stores-head">
        <button
          className="my-stores-back-btn"
          onClick={redirectMyPage}
        >
          뒤로 가기
        </button>
        <p className="my-stores-head-title">내 리뷰 내역</p>
      </div>

      <hr className="my-stores-underline" />

      {/* 리뷰 테이블 : 리뷰 테이블 시작*/}
      <div className="my-reviews-table-container">
        <span className="my-reviews-table-hint">*클릭시 상세내용 확인 가능</span>
        <table className="my-reviews-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>리뷰 내용</th>
              <th>별점</th>
            </tr>
          </thead>

          <tbody>
            {!loading && reviews.map((review) => (
              <tr key={review.id} onClick={() => openModal(review)} className="review-content-container">
                <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                <td className="review-content">
                  {(review.content ?? "").slice(0, 20)}
                  {(review.content?.length ?? 0) > 20 ? "..." : ""}
                </td>
                <td>{"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-reviews-pagination">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          이전
        </button>

        <span>{page} / {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          다음
        </button>
      </div>

      {/* ===================== 리뷰 상세 모달 ===================== */}
      {modalReview && (
        <div className="my-review-modal-overlay" onClick={closeModal}>
          <div className="my-review-modal" onClick={(e) => e.stopPropagation()}>
            {/* 별점 | 날짜 */}
            <div className="my-review-modal-header">
              <span className="my-review-modal-star">{"★".repeat(modalReview.rating) + "☆".repeat(5 - modalReview.rating)}</span>
              <span>{new Date(modalReview.createdAt).toLocaleDateString()}</span>
            </div>

            {/* 작성자 */}
            <div className="my-review-modal-section">
              <span className="my-review-main-text">작성자 | </span>
              <span className="my-review-sub-text">{modalReview.user_name}</span>
            </div>

            {/* content */}
            <div className="my-review-modal-section">
              <p className="my-review-sub-text">{modalReview.content}</p>
            </div>

            {/* quickOption (배열로 분리) */}
            {modalReview.quickOption && (
              <div className="my-review-modal-section">
                <span className="my-review-main-text">추가 Comment |</span>
                <div className="my-review-quick-options">
                  {modalReview.quickOption.split(",").map((opt, i) => (
                    <button key={i} className="my-review-quick-option-btn">{opt}</button>
                  ))}
                </div>
              </div>
            )}

            {/* 이미지 */}
            {modalReview.imageUrl && (
              <div className="my-review-modal-section">
                <img src={modalReview.imageUrl} alt="리뷰 이미지" className="my-review-modal-image"/>
              </div>
            )}

            {/* 삭제 버튼 */}
            <div className="my-review-modal-footer">
              <button className="my-review-delete-btn" onClick={() => handleDelete(modalReview.id)}>리뷰 삭제</button>
              <button className="my-review-modal-close-btn" onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyReviews;
