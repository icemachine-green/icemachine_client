import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateBusinessThunk,
  getBusinessDetailThunk,
} from "../../store/thunks/businessThunk.js";
import AddressSearchModal from "./AddressSearchModal.jsx";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.js";
import "./MyStoreEditModal.css";

const MyStoreEditModal = ({ business, onClose, onUpdateSuccess }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

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
    if (name === "phoneNumber") {
      nextValue = value.replace(/\D/g, "").slice(0, 11);
    }
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!business?.id) return;

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

    if (
      formData.phoneNumber.trim() !== "" &&
      formData.phoneNumber.length !== 11
    ) {
      alert("전화번호는 11자리여야 합니다.");
      return;
    }

    if (formData.phoneNumber.trim() !== "") {
      updatedData.phoneNumber = formatPhoneNumber(formData.phoneNumber);
    }

    try {
      await dispatch(
        updateBusinessThunk({
          businessId: business.id,
          businessData: updatedData,
        })
      ).unwrap();
      dispatch(getBusinessDetailThunk(business.id));
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  return (
    <div className="MyStoreEditModal-overlay">
      <div className="MyStoreEditModal-content">
        <h2 className="MyStoreEditModal-title">매장 정보 수정</h2>
        <p className="MyStoreEditModal-notice">
          * 수정을 원하는 항목만 입력해 주세요.
        </p>
        <form onSubmit={handleSubmit} className="MyStoreEditModal-form">
          <div className="MyStoreEditModal-form-group">
            <label>매장명 (현재: {business.name})</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="새 매장명"
            />
          </div>
          <div className="MyStoreEditModal-form-group">
            <label>담당자명 (현재: {business.managerName})</label>
            <input
              type="text"
              name="managerName"
              value={formData.managerName}
              onChange={handleChange}
              placeholder="새 담당자명"
            />
          </div>
          <div className="MyStoreEditModal-form-group">
            <label>연락처 (현재: {business.phoneNumber})</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="새 연락처"
            />
          </div>
          <div className="MyStoreEditModal-form-group">
            <label>기본 주소 (현재: {business.mainAddress})</label>
            <input
              type="text"
              name="mainAddress"
              value={formData.mainAddress}
              readOnly
              onClick={() => setIsOpen(true)}
              className="MyStoreEditModal-input-readonly"
              placeholder="새 기본 주소"
            />
          </div>
          <div className="MyStoreEditModal-form-group">
            <label>
              상세 주소 (현재: {business.detailedAddress || "없음"})
            </label>
            <input
              type="text"
              name="detailedAddress"
              value={formData.detailedAddress}
              onChange={handleChange}
              placeholder="새 상세 주소"
            />
          </div>
          <div className="MyStoreEditModal-actions">
            <button type="submit" className="MyStoreEditModal-save-btn">
              저장하기
            </button>
            <button
              type="button"
              className="MyStoreEditModal-cancel-btn"
              onClick={onClose}
            >
              취소
            </button>
          </div>
        </form>
      </div>
      {isOpen && (
        <AddressSearchModal
          onClose={() => setIsOpen(false)}
          onComplete={(data) =>
            setFormData((prev) => ({ ...prev, mainAddress: data.address }))
          }
        />
      )}
    </div>
  );
};

export default MyStoreEditModal;
