import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MyReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getMyReviews } from "../../store/thunks/reviewThunk";

const MyReviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { reviews, page, totalPages, loading } = useSelector((state) => state.reviews);
  const [openIndex, setOpenIndex] = useState(null);

  function redirectMyPage() {
    return navigate('/mypage');
  }

  useEffect(() => {
    dispatch(getMyReviews({ page: 1 }));
  }, []);

  const toggleReview = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDelete = async (reviewId) => {
    const isConfirmed = window.confirm(
      "선택한 리뷰를 삭제하시겠습니까?"
    );
    if (!isConfirmed) return;

    try {
      await dispatch(deleteReview(reviewId)).unwrap();
      alert("리뷰가 삭제되었습니다.");
      dispatch(getMyReviews({ page }));
    } catch (error) {
      alert("삭제에 실패했습니다.", error);
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
        <table className="my-reviews-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>리뷰 내용</th>
              <th>별점</th>
              <th>관리</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              reviews.map((review, index) => {
                const isOpen = openIndex === index;
                const isLong = review.content.length > 20;

                const displayText =
                  !isLong || isOpen
                    ? review.content
                    : review.content.slice(0, 20) + "...";

                return (
                  <tr key={review.id}>
                    <td>{new Date(review.createdAt).toLocaleDateString()}</td>

                    <td className="review-content">
                      <div
                        className="review-text"
                        onClick={() => isLong && toggleReview(index)}
                      >
                        {isLong && (
                          <span
                            className={`review-toggle-icon ${
                              isOpen ? "open" : ""
                            }`}
                          >
                            ▼
                          </span>
                        )}
                        <span className="review-text-content">
                          {displayText}
                        </span>
                      </div>
                    </td>

                    <td>
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </td>

                    <td>
                      <button
                        className="review-delete-btn"
                        onClick={() => handleDelete(review.id)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>

      <div className="pagination">
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

    </div>
  );
};

export default MyReviews;
