import React, { useRef, useState } from 'react';
import './ReviewWriteModal.css';

const ReviewWriteModal = ({ reservationId, onClose, onSuccess }) => {
  const [rating, setRating] = useState(0);        // 확정 별점
  const [hoverRating, setHoverRating] = useState(0); // hover 별점
  const [content, setContent] = useState('');    // 리뷰글: null 허용
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
  }

  const quickTexts = [
  '꼼꼼해요',
  '친절해요',
  '작업 속도가 빨라요',
  '설명이 자세해요',
  '모든 점이 완벽해요',
  ];

  const handleQuickTextClick = (text) => {
  if (content.includes(text)) return;
  setContent((prev) => prev ? `${prev}, ${text}` : text);
  };

  const handleSubmit = () => {
  if (rating === 0) {
    alert('별점을 선택해주세요.');
    return;
  }

  const payload = {
    reservationId,
    rating,
    content,
    image: imageFile,
  };

  console.log('리뷰 등록 데이터:', payload);

  // TODO: API 연동
  onSuccess();
  };

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div
        className="review-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="review-modal-header">
          <h2>만족도 평가 및 리뷰</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <hr className="review-page-underline" />

        {/* 별점 */}
        <div className="review-modal-star-section">
          <label className="review-modal-star-content">서비스 평가</label>
          <div className="review-modal-star-container">
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = star <= (hoverRating || rating);

              return (
                <span
                  key={star}
                  className={`review-modal-star ${isActive ? 'review-modal-active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              );
            })}
          </div>
        </div>

        {/* 선택 문구 */}
        <span className="review-modal-quick-text-content">어떤 점이 좋았나요?</span>
        <div className="review-modal-quick-text-section">
          {quickTexts.map((text) => (
            <button
              key={text}
              className="review-modal-quick-text-btn"
              onClick={() => handleQuickTextClick(text)}
            >
              {text}
            </button>
          ))}
        </div>

        {/* 리뷰 내용 */}
        <textarea
          placeholder="다른 고객들이 참고할 수 있도록 서비스에 대한 경험을 작성해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 사진 업로드 & 미리보기 */}
        <div className="review-modal-image-section">
          <div className="review-modal-btn-container">
            <label className="review-modal-image-upload-btn">
              <img className='review-modal-photo-icon' src="/icons/photoicon.png" alt="사진 아이콘" />
              <span className='review-modal-upload-text'>사진 추가</span>

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
            <div className="review-modal-image-preview">
              <img src={selectedImage} alt="preview" />
              <button
                type="button"
                className="review-modal-image-remove-btn"
                onClick={handleRemoveImage}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* 작성 버튼 */}
        <button className="review-modal-submit-btn" onClick={handleSubmit}>
          등록하기
        </button>
      </div>
    </div>
  );

};

export default ReviewWriteModal;
