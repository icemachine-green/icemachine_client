// import { useNavigate } from 'react-router-dom';
import './ReservationPage.css';

const ReservationPage = () => {
  // const navigate = useNavigate();

  // function redirectBack() {
  //   navigate(-1);
  // }

  return (
    <div className='reservationpage-container'>

      <div className="reservationpage-img">
        <img src="/icons/blue-ice_1440.png" alt="" />
      </div>

        {/* 헤더 */}
        <div className="reservationpage-head">
          <p className="reservationpage-head-title">예약 페이지</p>
        </div>

        {/* 가로선 */}
        <hr className="reservationpage-underline" />

        {/* 매장 정보 */}
        <div className="reservationpage-store-info-container">
          <div className="reservationpage-store-info-item">
            <span className='reservationpage-store-info-text'>매장명</span>
            <div className='reservationpage-store-info-input'>
              <input type="text" />
            </div>
          </div>

          <div className="reservationpage-store-info-item">
            <span className='reservationpage-store-info-text'>담당자명</span>
            <div className='reservationpage-store-info-input'>
              <input type="text" />
            </div>
          </div> 

          <div className="reservationpage-store-info-item">
            <span className='reservationpage-store-info-text'>연락처</span>
            <div className='reservationpage-store-info-input'>
              <input type="text" placeholder='"-"을 제외하고 입력해주세요.'/>
            </div>
          </div>

          <div className="reservationpage-store-info-item">
            <span className='reservationpage-store-info-text'>주소</span>
            <div className='reservationpage-store-info-addr-input'>
              <input type="text" />
            </div>
          </div>

          <div className="reservationpage-store-info-item">
            <span className='reservationpage-store-info-text'>상세주소</span>
            <div className='reservationpage-store-info-addr-input'>
              <input type="text" />
            </div>
          </div>
        </div>
        
        {/* 가로선 */}
        <hr className="reservationpage-underline" />

        {/* 제빙기 정보 */}
        <form action="" className="reservationpage-icemachine-info-form">
          {/* 제빙기 영역 */}
          <div className="reservationpage-icemachine-info-form-section">
            <div className="reservationpage-icemachine-info-section-title">제빙기</div>

            <div className="reservationpage-icemachine-info-form-row-container">
              {/* 브랜드 */}
              <div className="reservationpage-icemachine-info-form-row">
                <div className="reservationpage-icemachine-info-form-label">| 브랜드</div>
                <div className="reservationpage-icemachine-info-form-options">
                  <label><input type="radio" name="brand" value="HOSHIZAKI" /> Hoshizaki</label>
                  <label><input type="radio" name="brand" value="SCOTSMAN" /> Scotsman</label>
                  <label><input type="radio" name="brand" value="MANITOWOC" /> Manitowoc</label>
                  <label><input type="radio" name="brand" value="ICE_O_MATIC" /> Ice-O-Matic</label>
                  <label><input type="radio" name="brand" value="ETC" /> 기타</label>
                </div>
              </div>

              {/* 모델명 */}
              <div className="reservationpage-icemachine-info-form-row">
                <div className="reservationpage-icemachine-info-form-label">| 모델명</div>
                <div className="reservationpage-icemachine-info-form-options">
                  <label><input type="radio" name="model" value="CUBE" /> 큐브 아이스</label>
                  <label><input type="radio" name="model" value="NUGGET" /> 너겟 아이스</label>
                  <label><input type="radio" name="model" value="FLAKE" /> 플레이크 아이스</label>
                  <label><input type="radio" name="model" value="GOURMET" /> 고메 아이스</label>
                  <label><input type="radio" name="model" value="UNKNOWN" /> 모름</label>
                </div>
              </div>

              {/* 사이즈 */}
              <div className="reservationpage-icemachine-info-form-row">
                <div className="reservationpage-icemachine-info-form-label">| 사이즈</div>
                <div className="reservationpage-icemachine-info-form-options">
                  <label><input type="radio" name="size" value="SMALL" /> 소형(~50kg)</label>
                  <label><input type="radio" name="size" value="MEDIUM" /> 중형(51~150kg)</label>
                  <label><input type="radio" name="size" value="LARGE" /> 대형(151kg~)</label>
                </div>
              </div>
            </div>
          </div>

          {/* 서비스 종류 */}
          <div className="reservationpage-service-info-form-section">
            <div className="reservationpage-service-info-section-title">서비스 종류</div>

            <div className="reservationpage-service-info-form-row">
              <div className="reservationpage-service-info-form-options">
                <label><input type="radio" name="serviceType" value="INSPECTION" /> 방문 점검 (1시간)</label>
                <label><input type="radio" name="serviceType" value="STANDARD" /> 스탠다드 클린 (1시간)</label>
                <label><input type="radio" name="serviceType" value="DEEP" /> 딥 클린 (2시간)</label>
                <label><input type="radio" name="serviceType" value="PREMIUM" /> 프리미엄 딥 클린 (3시간)</label>
                <label><input type="radio" name="serviceType" value="SUBSCRIPTION" /> 구독 서비스</label>
              </div>
            </div>
          </div>
          
        </form>
        
        {/* 가로선 */}
        <hr className="reservationpage-underline" />

        {/* 예약 날짜/시간 */}
        <div className="reservationpage-date-info-container">

          {/* 예약 날짜 */}
          <div className="reservationpage-date-card">
            <span className="reservationpage-date-card-text">예약날짜</span>

            <div>
              {/* 달력 영역 */}
              <div className="reservationpage-calendar">
                <div className="reservationpage-calendar-header">
                  <button type="reservationpage-calendar-button">◀</button>
                  <span>2026.01</span>
                  <button type="reservationpage-calendar-button">▶</button>
                </div>

                <div className="reservationpage-calendar-week">
                  {["S", "M", "T", "W", "T", "F", "S"].map(day => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <div className="reservationpage-calendar-days">
                  {Array.from({ length: 31 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="reservationpage-calendar-day"
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 예약 시간 */}
          <div className="reservationpage-time-card">
            <span className="reservationpage-time-card-text">예약시간</span>

              <div className="reservationpage-time-section">
                <div className="reservationpage-time-row">
                  <span className="reservationpage-time-label">오전</span>
                  <div className="reservationpage-time-buttons">
                    {["09:00", "10:00", "11:00"].map(time => (
                      <button key={time} type="button" className="reservationpage-time-btn">
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="reservationpage-time-row">
                  <span className="reservationpage-time-label">오후</span>
                  <div className="reservationpage-time-buttons">
                    {["12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"].map(time => (
                      <button key={time} type="button" className="reservationpage-time-btn">
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
          </div>

        </div>
        
        {/* 가로선 */}
        <hr className="reservationpage-underline" />

        {/* 기타 정보*/}
        <div className="reservationpage-add-info-container">

          {/* 요청사항 */}
          <div className="reservationpage-req-card">
            <span className="reservationpage-req-card-text">요청사항</span>
            <div className='reservationpage-req-textarea-container'>
              <textarea
                placeholder="요청사항이 있으시다면 해당 내용을 남겨주세요."
                className="reservationpage-req-textarea"
              />
            </div>
          </div>  
          
          {/* 개인정보 수집동의 */}
          <div className="reservationpage-privacy-card">
            <span className="reservationpage-privacy-card-text">개인정보 수집동의</span>
            <div className='reservationpage-privacy-textarea-container'>
              <textarea readOnly className="reservationpage-privacy-textarea" defaultValue={`개인정보 수집 및 이용 동의

■ 개인정보 수집목적 및 이용목적
  문의 및 메시지 접수

■ 수집하는 개인정보 항목
  성명, 이메일, 주소 등

■  개인정보의 보유기간 및 이용기간
  관계 법령의 규정에 따라 귀하의 개인정보를 보존할 의무가 있는 경우가 아닌 한, 회사는 위의 수집 및 이용목적을 달성할 때까지 귀하의 개인정보를 보유 및 이용합니다.

* 귀하는 위와 같은 일반 개인정보의 수집 및 이용을 거부할 수 있습니다. 다만, 일반 개인정보의 필수적 수집 및 이용에 동의하지 않을 경우 문의 및 메시지 서비스 이용이 불가능합니다.`}/>
              <label className="reservationpage-privacy-agree">
                <input type="checkbox" />
                개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>
          </div>

        </div>
        
        {/* 가로선 */}
        <hr className="reservationpage-underline" />

        {/* 예약 신청 버튼 */}
        <div className='reservationpage-btn-container'>
          <button className='reservationpage-btn'>예약 신청</button>
        </div>

      </div>
  );
};

export default ReservationPage;