import { useNavigate } from 'react-router-dom';
import './MyStoreDetail.css';
import { useState } from 'react';

const storeList = [
  { store: "한옥 커피", name: "김정현", phone: "053-333-1234", address: "대구광역시 동구 팔공로 24길 7", brand: "아이스트로", model: "ICE-70B", size: "중형(650 x 600 x 900mm)" },
  { store: "Green 커피", name: "김정현", phone: "053-333-1234", address: "대구광역시 동구 팔공로 24길 7", brand: "아이스트로", model: "ICE-70B", size: "중형(650 x 600 x 900mm)" },
  { store: "Cafe Spell", name: "김정현", phone: "053-333-1234", address: "대구광역시 동구 팔공로 24길 7", brand: "아이스트로", model: "ICE-70B", size: "중형(650 x 600 x 900mm)" },
  { store: "아메리카노 1000", name: "김정현", phone: "053-333-1234", address: "대구광역시 동구 팔공로 24길 7", brand: "아이스트로", model: "ICE-70B", size: "중형(650 x 600 x 900mm)" },
  { store: "팩 다방", name: "김정현", phone: "053-333-1234", address: "대구광역시 동구 팔공로 24길 7", brand: "아이스트로", model: "ICE-70B", size: "중형(650 x 600 x 900mm)" },
];

const MyStoreDetail = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate();

  const toggleAnswer = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const handleImageClick = (imageSrc, e) => {
    e.stopPropagation(); // 카드 토글 클릭 방지
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
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
                    {item.store}
                  </span>
                  <span className={`my-store-detail-arrow ${isOpen ? "open" : ""}`}>▼</span>
                </div>
                <div>
                  {isOpen && (
                    <div className='my-store-detail-toggle'>
                      <div className="my-store-detail-point-line"></div>
                      <div className='my-store-detail-info'>
                        <p>매장명 :</p>
                        <p>{item.store}</p>
                      </div>
                      <div className='my-store-detail-info'>
                        <p>담당자명 :</p>
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
                        <div className='my-store-detail-machine-info'>
                          <p>고객 등록 사진 :</p>
                          <img className='my-store-detail-machine-photo-icon' src="/icons/jaebinggi_1.png" alt="제빙기 등록 사진" onClick={(e) => handleImageClick("/icons/jaebinggi_1.png", e)}/>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }))}
        </div>
        
        {isModalOpen && (
          <div className="my-store-detail-modal-overlay" onClick={closeModal}>
            <div
              className="my-store-detail-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={modalImage}
                alt="제빙기 확대 이미지"
                className="my-store-detail-modal-image"
              />
              <button
                className="my-store-detail-modal-close"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
          </div>
        )}
        
      </div>
  );
};

export default MyStoreDetail;