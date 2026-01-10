import React, { useState, useEffect } from "react";
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
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  // 초기값을 기존 데이터로 설정하여 '무엇을 수정할지' 직관적으로 보이게 함
  const [formData, setFormData] = useState({
    name: business?.name || "",
    managerName: business?.managerName || "",
    phoneNumber: business?.phoneNumber?.replace(/-/g, "") || "",
    mainAddress: business?.mainAddress || "",
    detailedAddress: business?.detailedAddress || "",
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

    // 변경된 항목만 추출 (PATCH의 핵심)
    const updatedData = {};
    if (formData.name !== business.name) updatedData.name = formData.name;
    if (formData.managerName !== business.managerName)
      updatedData.managerName = formData.managerName;
    if (formData.mainAddress !== business.mainAddress)
      updatedData.mainAddress = formData.mainAddress;
    if (formData.detailedAddress !== (business.detailedAddress || ""))
      updatedData.detailedAddress = formData.detailedAddress;

    // 전화번호 처리
    const rawOriginPhone = business.phoneNumber.replace(/-/g, "");
    if (formData.phoneNumber !== rawOriginPhone) {
      if (formData.phoneNumber.length !== 11) {
        alert("전화번호는 11자리여야 합니다.");
        return;
      }
      updatedData.phoneNumber = formatPhoneNumber(formData.phoneNumber);
    }

    if (Object.keys(updatedData).length === 0) {
      alert("수정된 내용이 없습니다.");
      return;
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
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="edit-modal-header">
          <h2 className="edit-modal-title">매장 정보 수정</h2>
          <button className="edit-modal-close-x" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-modal-form">
          <div className="edit-modal-scroll-area">
            <div className="edit-input-group">
              <label>매장명</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="매장명을 입력하세요"
              />
            </div>

            <div className="edit-input-group">
              <label>담당자명</label>
              <input
                type="text"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                placeholder="담당자 성함을 입력하세요"
              />
            </div>

            <div className="edit-input-group">
              <label>연락처</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="숫자만 입력 (예: 01012345678)"
              />
            </div>

            <div className="edit-input-group">
              <label>기본 주소</label>
              <div
                className="address-input-wrapper"
                onClick={() => setIsAddressOpen(true)}
              >
                <input
                  type="text"
                  name="mainAddress"
                  value={formData.mainAddress}
                  readOnly
                  placeholder="주소 검색을 이용해 주세요"
                />
                <button type="button" className="btn-address-search">
                  검색
                </button>
              </div>
            </div>

            <div className="edit-input-group">
              <label>상세 주소</label>
              <input
                type="text"
                name="detailedAddress"
                value={formData.detailedAddress}
                onChange={handleChange}
                placeholder="상세 주소를 입력하세요"
              />
            </div>
          </div>

          <div className="edit-modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn-save">
              저장하기
            </button>
          </div>
        </form>
      </div>

      {isAddressOpen && (
        <AddressSearchModal
          onClose={() => setIsAddressOpen(false)}
          onComplete={(data) =>
            setFormData((prev) => ({ ...prev, mainAddress: data.address }))
          }
        />
      )}
    </div>
  );
};

export default MyStoreEditModal;
