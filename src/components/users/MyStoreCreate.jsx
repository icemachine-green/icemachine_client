import { useNavigate } from 'react-router-dom';
import './MyStoreCreate.css';
import { useRef, useState } from 'react';

const MyStoreCreate = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState([]);      // 리뷰사진: null 허용
  const [selectedImage, setSelectedImage] = useState(null); // 선택한 리뷰사진 미리보기
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);

    if (fileInputRef.current) {
    fileInputRef.current.value = '';
    }
  };

  function redirectMyStore() {
    return navigate('/mypage/stores');
  }

  return (
    <div className='my-store-create-container'>

        {/* 헤더 */}
        <div className="my-store-create-head">
          <button className="my-store-create-back-btn" onClick={redirectMyStore}>뒤로 가기</button>
            <p className="my-store-create-head-title">내 매장 정보 등록</p>
        </div>

        {/* 가로선 */}
        <hr className="my-store-create-underline" />

        {/* 카드 */}
        <div className="my-store-create-card-container">

          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>매장명 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" />
            </div>
          </div>

          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>담당자명 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" />
            </div>
          </div>

          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>연락처 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" inputMode='numeric'  placeholder='"-"을 제외하고 입력해주세요.'/>
            </div>
          </div>

          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>주소 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" />
            </div>
          </div>

          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>상세 주소 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" />
            </div>
          </div>

          <div className="my-store-create-icemachine-card">
            <div className="my-store-create-icemachine-text-container">
              <span className='my-store-create-icemachine-text'>제빙기 :</span>
            </div>
            <div className="my-store-create-icemachine-input-container">
              <div className='my-store-create-icemachine-input'>
                <span>브랜드</span>
                <input type="text" />
              </div>
              <div className='my-store-create-icemachine-input'>
                <span>모델명</span>
                <input type="text" />
              </div>
              <div className='my-store-create-icemachine-input'>
                <span>사이즈</span>
                <input type="text" />
              </div>
              <div className='my-store-create-icemachine-image-container'>
                <span className='my-store-create-icemachine-image-text'>제빙기 사진</span>
                {/* 사진 업로드 & 미리보기 */}
                <div className="my-store-create-icemachine-image-section">
                  <div className="my-store-create-icemachine-image-btn-container">
                    <label className="my-store-create-icemachine-image-upload-btn">
                      <img className='my-store-create-icemachine-photo-icon' src="/icons/photoicon.png" alt="사진 아이콘" />
                      <span className='my-store-create-icemachine-upload-text'>사진 추가</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </label>
                  </div>

                  {selectedImage && (
                    <div className="my-store-create-icemachine-image-preview">
                      <img src={selectedImage} alt="preview" />
                      <button
                        type="button"
                        className="my-store-create-icemachine-image-remove-btn"
                        onClick={handleRemoveImage}
                      >
                        ✕
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 등록 버튼 */}
        <div className='my-store-create-btn-container'>
          <button className='my-store-later-btn'>나중에 등록하기</button>
          <button className='my-store-create-btn'>입력한 정보 등록하기</button>
        </div>
        
      </div>
  );
};

export default MyStoreCreate;