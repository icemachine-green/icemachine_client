import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./Component04.css";
import { Pagination, Navigation } from 'swiper/modules';
import Component04Skeleton from "../common/Skeleton/Component04Skeleton.jsx";

const Component04 = ({ isLoading }) => {
  // 1. 로딩 중일 때는 스켈레톤 반환
  if (isLoading) {
    return <Component04Skeleton />;
  }

  // 2. 로딩 완료 시 실제 Swiper 컨텐츠 반환
  return (
    <div className="component04-background">
      <div className="component04-container">
        <div className="component04-text">
          <h1 className="component04-title">작업 과정</h1>
          <div className="component04-separator-bar"></div>
        </div>
        <Swiper
          pagination={{ type: 'fraction' }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="slide-content">
              <p>스팀 청소</p>
              <img src="/icons/com4-first.png" alt="스팀 청소" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>세부 청소</p>
              <img src="/icons/com4-second.png" alt="세부 청소" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>필터 청소</p>
              <img src="/icons/com4-third.png" alt="필터 청소" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>살균 및 소독</p>
              <img src="/icons/com4-fourth.png" alt="살균 및 소독" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>노즐 및 분사구 청소</p>
              <img src="/icons/com4-fifth.png" alt="노즐 및 분사구 청소" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>얼음 도출 확인 및 마무리</p>
              <img src="/icons/com4-sixth.png" alt="마무리" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>    
    </div>
  );
};

export default Component04;