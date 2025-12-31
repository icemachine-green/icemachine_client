import React, { useRef, useState } from 'react';
import './ReviewWriteModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../store/thunks/reviewThunk.js'

const ReviewWriteModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.reviews);

  const [rating, setRating] = useState(0);        // 확정 별점
  const [hoverRating, setHoverRating] = useState(0); // hover 별점
  const [content, setContent] = useState('');    // 직접 입력 리뷰 : null 허용
  const [selectedQuickTexts, setSelectedQuickTexts] = useState([]); // 선택 문구들 : null 허용
  const [imageFile, setImageFile] = useState(null);      // 리뷰사진: null 허용
  // const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleRemoveImage = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage); // 메모리 누수 방지를 위해 URL 해제
    }
    setImageFile(null);
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // input file 엘리먼트 초기화
    }
  };

  // 모달이 닫을 때 호출
  const handleClose = () => {
    // 내부 상태를 모두 초기화
    setRating(0);
    setHoverRating(0);
    setContent('');
    setSelectedQuickTexts([]);
    handleRemoveImage();

    onClose();
  }

  if (!open) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // TODO: 여기에 파일 유효성 검사 로직 추가 (예: 이미지 크기, 형식)
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) { alert('JPG 또는 PNG 파일만 업로드할 수 있습니다.'); return; }
    // const isLt2M = file.size / 1024 / 1024 < 2; // 2MB 미만
    // if (!isLt2M) { alert('이미지 크기는 2MB보다 작아야 합니다.'); return; }

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const quickTexts = [
  '꼼꼼해요',
  '친절해요',
  '작업 속도가 빨라요',
  '설명이 자세해요',
  '모든 점이 완벽해요',
  ];
  
  const handleQuickTextClick = (text) => {
    setSelectedQuickTexts((prev) => {
      if (prev.includes(text)) {
        // 이미 선택된 경우 → 제거
        return prev.filter((t) => t !== text);
      }
      // 새로 선택
      return [...prev, text];
    });
  };

  // API 연동 및 폼 제출 로직
  const handleSubmit = async (event) => {
    event.preventDefault(); // form 태그의 기본 동작 방지

    if (rating === 0) {
      alert('별점을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    // 백엔드 명세에 맞게 파라미터 이름을 맞춰주세요
    formData.append('rating', rating);
    formData.append('content', content);
    formData.append('quickOption', selectedQuickTexts.join(', '));
    if (imageFile) {
      formData.append('imageUrl', imageFile);
    }
    
    try {
      await dispatch(createReview(formData)).unwrap();
      window.alert('리뷰가 성공적으로 등록되었습니다!');
      handleClose(); // 성공 후에도 handleClose를 호출하여 상태 초기화 및 닫기
    } catch (error) {
      const errorMessage = error?.message || '리뷰 등록에 실패했습니다.';
      window.alert(errorMessage);
    }
  };

  return (
    <div className="review-modal-overlay" onClick={handleClose}>
      <form
        className="review-modal-container"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        {/* header */}
        <div className="review-modal-header">
          <h2>만족도 평가 및 리뷰</h2>
          <button type='button' onClick={handleClose}>✕</button>
        </div>

        <hr className="review-page-underline" />

        {/* 별점 */}
        <div className="review-modal-star-section">
          <label className="review-modal-star-content">서비스 평가</label>
          <div className="review-modal-star-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`review-modal-star ${star <= (hoverRating || rating) ? 'review-modal-active' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
              ))}
          </div>
        </div>

        {/* 선택 문구 */}
        <label className="review-modal-quick-text-content">어떤 점이 좋았나요?</label>
        <div className="review-modal-quick-text-section">
          {quickTexts.map((text) => {
            const isSelected = selectedQuickTexts.includes(text);

            return (
              <button
                type="button"
                key={text}
                className={`review-modal-quick-text-btn ${
                  isSelected ? 'active' : ''
                }`}
                onClick={() => handleQuickTextClick(text)}
              >
                {text}
            </button>
            );
          })}
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

          {previewImage && (
            <div className="review-modal-image-preview">
              <img src={previewImage} alt="preview" />
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
        <button type="submit" className="review-modal-submit-btn" disabled={loading}>
          {loading ? '등록 중...' : '등록하기'}
        </button>
      </form>
    </div>
  );

};

export default ReviewWriteModal;
