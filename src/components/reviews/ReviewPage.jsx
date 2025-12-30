import React, { useState } from 'react';
import './ReviewPage.css';
import ReviewWriteModal from './ReviewWriteModal.jsx';

const reviewData = [
  {
    id: 1,
    stars: "★★★★☆",
    clientId: "user_ice",
    date: "2025.12.15",
    text: "정기적으로 관리받으니 안심하고 사용할 수 있어서 좋아요. 항상 친절하십니다!",
    image: "/icons/login.png",
  },
  {
    id: 2,
    stars: "★★★★★",
    clientId: "cafe_boss",
    date: "2025.12.14",
    text: "급하게 연락드렸는데 빨리 와주셔서 정말 다행이었어요. 덕분에 영업에 차질이 없었습니다.",
    image: "/icons/login.png",
  },
  {
    id: 3,
    stars: "★★★★★",
    clientId: "happy_day",
    date: "2025.12.12",
    text: "얼음이 훨씬 깨끗하고 투명해진 느낌입니다. 진작에 케어받을 걸 그랬어요.",
    image: "/icons/login.png",
  },
  {
    id: 4,
    stars: "★★★★☆",
    clientId: "ice_lover",
    date: "2025.12.11",
    text: "사장님이 정말 꼼꼼하게 봐주세요. 제빙기 상태도 체크해주시고, 사용 팁도 알려주셨습니다.",
    image: "/icons/login.png",
  },
  {
    id: 5,
    stars: "★★★★★",
    clientId: "ssac_fan",
    date: "2025.12.10",
    text: "위생에 민감한데, 세척 후 내부를 보여주시니 믿음이 갑니다. 앞으로도 잘 부탁드립니다.",
    image: "/icons/login.png",
  },
  {
    id: 6,
    stars: "★★★★★",
    clientId: "clean_ice",
    date: "2025.12.08",
    text: "새것처럼 깨끗해졌어요! 여름 오기 전에 한 번 더 받아야겠습니다.",
    image: "/icons/login.png",
  },
];

const ReviewPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="review-page-container">
      <div className="review-page-sub-container">
        <div className="review-page-write-btn-container">
          <button className="review-page-write-btn" onClick={() => setIsModalOpen(true)}>리뷰 작성</button>
        </div>

        <div className="review-page-head-container">
          <div className="review-page-head-line">
              <div className="review-page-head-sub-container">
                <span className="review-page-head-text">실제 고객님들의 </span>
                <span className="review-page-head-stars">★★★★★</span>
              </div>
              <span className="review-page-head-title">REAL REVIEW</span>
          </div>
        </div>

        <div className="review-page-sort-container">
          <button className="review-page-latest-btn">최신순</button>
          <button className="review-page-rating-btn">별점순</button>
        </div>

        <div className="review-page-box-container">
          {reviewData.map((review) => (
              <div key={review.id} className="review-page-box">
                <img
                  src={review.image}
                  alt="review"
                  className="review-page-image"
                />
                <div className="review-page-content">
                  <div className="review-page-top">
                    <span className="review-page-stars">
                      {review.stars}
                    </span>
                    <span className="review-page-info">
                      {review.clientId} | {review.date}
                    </span>
                  </div>
                  <hr className="review-page-underline" />
                  <p className="review-page-text">{review.text}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="review-page-more-btn-container">
          <button className="review-page-more-btn">더 보기</button>
        </div>
        
        {isModalOpen && (<ReviewWriteModal onClose={() => setIsModalOpen(false)} />)}

      </div>
    </div>
  );
};

export default ReviewPage;
