import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles(라이브러리)
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 나의 css 임포트
import "./Component04.css";

// 슬라이드 삽입 이미지 임포트
import slide1 from '../../../public/icons/com4-first.png';
import slide2 from '../../../public/icons/com4-second.png';
import slide3 from '../../../public/icons/com4-third.png';
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
              <p>작업과정 1. 스팀 청소</p>
              <img src={slide1} alt="작업과정 1 스팀 청소" />              
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>작업과정 2. 세부 청소</p>
              <img src={slide2} alt="작업과정 2 세부 청소" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-content">
              <p>작업과정 3. 필터 청소</p>
              <img src={slide3} alt="작업과정 1 필터 청소" />
            </div>
          </SwiperSlide>
        </Swiper>
       </>
		  </div>		
		</div>
  );
};

export default Component04;