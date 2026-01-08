import React from "react";
import { useNavigate } from "react-router-dom";
import "./Component05.css";
import Component05Skeleton from "../common/Skeleton/Component05Skeleton.jsx";

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

const Component05 = ({ isLoading }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/reviews");
  };

  // 1. 로딩 중일 때는 스켈레톤 반환
  if (isLoading) {
    return <Component05Skeleton />;
  }

  // 2. 로딩 완료 시 실제 UI 반환
  return (
    <div className="component05-background">
      <div className="component05-content-wrapper">
        <div className="component05-header">
          <div className="component05-header-left">
            <h1 className="component05-title">리뷰</h1>
            <div className="component05-separator-bar"></div>
          </div>
          <button
            className="component05-redirect-button"
            onClick={handleRedirect}
          >
            리뷰 보러가기
          </button>
        </div>

        <div className="component05-reviews-grid">
          {reviewData.map((review) => (
            <div key={review.id} className="component05-review-box">
              <img
                src={review.image}
                alt="review"
                className="component05-review-image"
              />
              <div className="component05-review-content">
                <div className="component05-review-top">
                  <span className="component05-review-stars">
                    {review.stars}
                  </span>
                  <span className="component05-review-info">
                    {review.clientId} | {review.date}
                  </span>
                </div>
                <hr className="component05-review-underline" />
                <p className="component05-review-text">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Component05;
