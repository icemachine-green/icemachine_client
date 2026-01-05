import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateBusinessThunk,
  getBusinessDetailThunk,
} from "../../store/thunks/businessThunk.js";
import AddressSearchModal from "./AddressSearchModal.jsx";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.js";

const MyStoreEditModal = ({ business, onClose, onUpdateSuccess }) => {
  const dispatch = useDispatch();
  
  // 주소 검색 모달창 관련
  const [isOpen, setIsOpen] = useState(false);

  // --- [수정 위치: 입력란은 빈칸으로 시작] ---
  const [formData, setFormData] = useState({
    name: "",
    managerName: "",
    phoneNumber: "",
    mainAddress: "",
    detailedAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

    // 전화번호 전용 처리
    if (name === "phoneNumber") {
      nextValue = value.replace(/\D/g, "").slice(0, 11);
    }

    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!business?.id) return;

    // --- [수정 위치: 입력된 값만 반영, 나머지는 기존 정보 유지] ---
    const updatedData = {
      name: formData.name.trim() !== "" ? formData.name : business.name,
      managerName:
        formData.managerName.trim() !== ""
          ? formData.managerName
          : business.managerName,
      phoneNumber:
        formData.phoneNumber.trim() !== ""
          ? formData.phoneNumber
          : business.phoneNumber,
      mainAddress:
        formData.mainAddress.trim() !== ""
          ? formData.mainAddress
          : business.mainAddress,
      detailedAddress:
        formData.detailedAddress.trim() !== ""
          ? formData.detailedAddress
          : business.detailedAddress,
    };

    // 전화번호를 "수정한 경우에만" 검증
    if (formData.phoneNumber.trim() !== "") {
      if (formData.phoneNumber.length !== 11) {
        alert("전화번호는 11자리여야 합니다.");
        return;
      }

      updatedData.phoneNumber = formatPhoneNumber(
        formData.phoneNumber
      );
    }

    try {
      await dispatch(
        updateBusinessThunk({
          businessId: business.id,
          businessData: updatedData,
        })
      ).unwrap();

      // alert 삭제 후 바로 갱신 및 효과 실행
      dispatch(getBusinessDetailThunk(business.id));
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>매장 정보 수정</h2>
        <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem" }}>
          * 수정을 원하는 항목만 입력해 주세요.
        </p>
        <form onSubmit={handleSubmit}>
          {/* --- [수정 위치: label에 현재 정보 노출 및 placeholder 활용] --- */}
          <div className="form-group">
            <label>매장명 (현재: {business.name})</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="새 매장명"
            />
          </div>
          <div className="form-group">
            <label>담당자명 (현재: {business.managerName})</label>
            <input
              name="managerName"
              value={formData.managerName}
              onChange={handleChange}
              placeholder="새 담당자명"
            />
          </div>
          <div className="form-group">
            <label>연락처 (현재: {business.phoneNumber})</label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="새 연락처"
            />
          </div>
          <div className="form-group">
            <label>기본 주소 (현재: {business.mainAddress})</label>
            <input
              name="mainAddress"
              value={formData.mainAddress}
              readOnly
              onClick={() => setIsOpen(true)}
              placeholder="새 기본 주소"
            />
          </div>
          <div className="form-group">
            <label>
              상세 주소 (현재: {business.detailedAddress || "없음"})
            </label>
            <input
              name="detailedAddress"
              value={formData.detailedAddress}
              onChange={handleChange}
              placeholder="새 상세 주소"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              저장하기
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>

      {/* 주소 검색 모달 */}
      {isOpen && (
        <AddressSearchModal
          onClose={() => setIsOpen(false)}
          onComplete={(data) => {
            setFormData((prev) => ({
              ...prev,
              mainAddress: data.address,
            }));
          }}
        />
      )}
    </div>
  );
};

export default MyStoreEditModal;
