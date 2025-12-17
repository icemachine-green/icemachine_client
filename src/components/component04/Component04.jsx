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
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>작업과정1. 스팀 청소</SwiperSlide>
        <SwiperSlide>작업과정2. 세부 청소</SwiperSlide>
        <SwiperSlide>작업과정3. 필터 청소</SwiperSlide>
      </Swiper>
    </>
		  </div>		
		</div>
  );
};

export default Component04;