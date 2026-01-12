import "./AddressSearchModal.css";
import DaumPostcode from "react-daum-postcode";

/**
 * @file AddressSearchModal.jsx
 * @description 주소 검색 모달 (레이아웃 깨짐 수정 버전)
 */
const AddressSearchModal = ({ onClose, onComplete }) => {
  const handleComplete = (data) => {
    const fullAddress = data.address;
    const zonecode = data.zonecode;

    onComplete({
      address: fullAddress,
      zonecode,
    });

    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="addresssearch-modal-backdrop" onClick={handleBackdropClick}>
      <div className="addresssearch-modal">
        {/* 헤더 영역 */}
        <div className="addresssearch-modal-header">
          <span className="addresssearch-title">주소 검색</span>
          <button className="addresssearch-close-x" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* 🚩 핵심 수정: 우편번호 서비스가 들어갈 컨테이너 */}
        <div className="addresssearch-postcode-container">
          <DaumPostcode
            onComplete={handleComplete}
            autoClose={false}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* 하단 버튼 */}
        <div className="addresssearch-footer">
          <button className="addresssearch-modal-close-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressSearchModal;
