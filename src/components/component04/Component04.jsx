import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles(라이브러리)
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 나의 css 임포트
import "./Component04.css";

// import required modules
import { Pagination, Navigation } from 'swiper/modules';


const Component04 = () => {
  return (
		<div className="component04-background">
			<div className="component04-container">
				<div className="component04-text">
					<h1 className="component04-title">작업 과정</h1>
					<div className="component04-separator-bar"></div>
				</div>
				<>
            <Swiper
          pagination={{ type: 'fraction' }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="slide-content">
              <p>스팀 청소</p>
              <img src="/icons/com4-first.png" />              
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>세부 청소</p>
               <img src="/icons/com4-second.png" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>필터 청소</p>
               <img src="/icons/com4-third.png" />
            </div>
          </SwiperSlide>

            <SwiperSlide>
            <div className="slide-content">
              <p>살균 및 소독</p>
               <img src="/icons/com4-fourth.png" />              
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>노즐 및 분사구 청소</p>
               <img src="/icons/com4-fifth.png" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>얼음 도출 확인 및 마무리</p>
               <img src="/icons/com4-sixth.png" />
            </div>
          </SwiperSlide>
        </Swiper>
       </>
		  </div>		
		</div>
  );
};

export default Component04;