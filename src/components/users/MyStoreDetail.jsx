import { useNavigate } from 'react-router-dom';
import './MyStoreDetail.css';
import { useState } from 'react';

const storeList = [
  { name: "한옥 커피", phone: "053-333-1234", address: "대구광역시 동구 팔공로 24길 7", brand: "아이스트로", model: "ICE-70B", size: "중형(650 x 600 x 900mm)" },
  { name: "Green 커피", phone: "053-333-1234", address: "대구광역시 동구 팔공로 24길 7", brand: "아이스트로", model: "ICE-70B", size: "중형(650 x 600 x 900mm)" },
  { name: "Cafe Spell", phone: "053-333-1234", address: "대구광역시 동구 팔공로 24길 7", brand: "아이스트로", model: "ICE-70B", size: "중형(650 x 600 x 900mm)" },
  { name: "아메리카노 1000", phone: "053-333-1234", address: "대구광역시 동구 팔공로 24길 7", brand: "아이스트로", model: "ICE-70B", size: "중형(650 x 600 x 900mm)" },
  { name: "팩 다방", phone: "053-333-1234", address: "대구광역시 동구 팔공로 24길 7", brand: "아이스트로", model: "ICE-70B", size: "중형(650 x 600 x 900mm)" },
];

const MyStoreDetail = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggleAnswer = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  function redirectMyStore() {
    return navigate('/mypage/stores');
  }

  return (
    <div className='my-store-detail-container'>

        {/* 헤더 */}
        <div className="my-store-detail-head">
          <button className="my-store-detail-back-btn" onClick={redirectMyStore}>뒤로 가기</button>
            <p className="my-store-detail-head-title">내 매장 정보 조회</p>
        </div>

        {/* 가로선 */}
        <hr className="my-store-detail-underline" />

        {/* 카드 */}
        <div className="my-store-detail-card-container">
          {storeList.length === 0 ? (
            <div className="my-store-detail-empty">
              등록된 매장정보가 없습니다.
            </div>
          ) : (
          storeList.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div>
                <div className="my-store-detail-card" key={index} onClick={() => toggleAnswer(index)}>
                  <span className='my-store-detail-card-text'>매장명 :</span>

                  <span className="my-store-detail-card-name">
                    {item.name}
                  </span>
                  <span className={`my-store-detail-arrow ${isOpen ? "open" : ""}`}>▼</span>
                </div>
                <div>
                  {isOpen && (
                    <div className='my-store-detail-toggle'>
                      <div className="my-store-detail-point-line"></div>
                      <div className='my-store-detail-info'>
                        <p>매장명 :</p>
                        <p>{item.name}</p>
                      </div>
                      <div className='my-store-detail-info'>
                        <p>연락처 :</p>
                        <p>{item.phone}</p>
                      </div>
                      <div className='my-store-detail-info'>
                        <p>주소 :</p>
                        <p>{item.address}</p>
                      </div>
                      <div className='my-store-detail-info'>
                        <p>제빙기</p>
                      </div>
                      <div className="my-store-detail-machine-info-container">
                        <div className='my-store-detail-machine-info'>
                          <p>브랜드 :</p>
                          <p>{item.brand}</p>
                        </div>
                        <div className='my-store-detail-machine-info'>
                          <p>모델명 :</p>
                          <p>{item.model}</p>
                        </div>
                        <div className='my-store-detail-machine-info'>
                          <p>사이즈 :</p>
                          <p>{item.size}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }))}
        </div>
        
      </div>
  );
};

export default MyStoreDetail;