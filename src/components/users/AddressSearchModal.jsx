import "./AddressSearchModal.css";
import DaumPostcode from "react-daum-postcode";

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

  return (
    <div className="addresssearch-modal-backdrop">
      <div className="addresssearch-modal">
        <DaumPostcode onComplete={handleComplete} />
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default AddressSearchModal;
