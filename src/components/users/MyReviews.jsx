import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./MyReviews.css";

const MyReviews = () => {
  const navigate = useNavigate();

  function redirectMyPage() {
    return navigate('/mypage');
  }

  const [openIndex, setOpenIndex] = useState(null);

  const reviews = [
    {
      date: "2025-12-26",
      content:
        "서비스 정말 좋았습니다. 앞으로도 자주 이용 하겠습니다. 이번 기사님도 친절하셨어요. 다음에도 꼭 다시 이용할 예정입니다. 감사합니다.",
      rating: 5,
    },
    {
      date: "2025-12-26",
      content:
        "전반적으로 만족스러웠습니다. 응대도 빠르고 작업도 깔끔했습니다.",
      rating: 4,
    },
    {
      date: "2025-12-26",
      content:
        "기사님이 정말 친절하셨고 설명도 자세해서 신뢰가 갔습니다.",
      rating: 5,
    },
        {
      date: "2025-12-26",
      content:
        "서비스 정말 좋았습니다. 앞으로도 자주 이용 하겠습니다. 이번 기사님도 친절하셨어요. 다음에도 꼭 다시 이용할 예정입니다. 감사합니다.",
      rating: 5,
    },
    {
      date: "2025-12-26",
      content:
        "전반적으로 만족스러웠습니다. 응대도 빠르고 작업도 깔끔했습니다.",
      rating: 4,
    },
    {
      date: "2025-12-26",
      content:
        "기사님이 정말 친절하셨고 설명도 자세해서 신뢰가 갔습니다.",
      rating: 5,
    },
        {
      date: "2025-12-26",
      content:
        "서비스 정말 좋았습니다. 앞으로도 자주 이용 하겠습니다. 이번 기사님도 친절하셨어요. 다음에도 꼭 다시 이용할 예정입니다. 감사합니다.",
      rating: 5,
    },
    {
      date: "2025-12-26",
      content:
        "전반적으로 만족스러웠습니다. 응대도 빠르고 작업도 깔끔했습니다.",
      rating: 4,
    },
    {
      date: "2025-12-26",
      content:
        "기사님이 정말 친절하셨고 설명도 자세해서 신뢰가 갔습니다.",
      rating: 5,
    },
  ];

  const toggleReview = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, index) => {
              const isOpen = openIndex === index;
              const isLong = review.content.length > 20;

              const displayText =
                !isLong || isOpen
                  ? review.content
                  : review.content.slice(0, 20) + "...";

              return (
                <tr key={index}>
                  <td>{review.date}</td>

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
                    <div className="star-container">
                      <img
                        src="/icons/star.png"
                        alt="별점"
                        className="star-img"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
