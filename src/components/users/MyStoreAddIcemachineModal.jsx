/**
 * @file MyStoreAddIcemachineModal.jsx
 * @description 제빙기 등록 바텀시트 컴포넌트 (테마 통합 버전)
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createIcemachineThunk } from "../../store/thunks/icemachineThunk.js";
import "./MyStoreAddIcemachineModal.css";

const MyStoreAddIcemachineModal = ({ businessId, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    brand: "",
    customBrand: "",
    size: "",
    model: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalBrand =
      inputs.brand === "ETC" ? inputs.customBrand : inputs.brand;
    const payload = {
      businessId,
      icemachineData: {
        brand: finalBrand,
        size: inputs.size,
        model: inputs.model,
      },
    };

    try {
      await dispatch(createIcemachineThunk(payload)).unwrap();
      if (onSuccess) onSuccess(); // 부모 컴포넌트 리렌더링 유도
      onClose();
    } catch (error) {
      console.error("제빙기 등록 실패:", error);
    }
  };

  return (
    <div className="ice-modal-overlay" onClick={onClose}>
      <div className="ice-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ice-modal-header">
          <h2 className="ice-modal-title">새 제빙기 등록</h2>
          <button className="ice-modal-close-x" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ice-modal-form">
          <div className="ice-modal-scroll-area">
            {/* 브랜드 선택 */}
            <div className="ice-input-group">
              <label>제빙기 브랜드</label>
              <select
                name="brand"
                value={inputs.brand}
                onChange={handleChange}
                required
              >
                <option value="">브랜드를 선택하세요</option>
                <option value="호시자키">호시자키 (Hoshizaki)</option>
                <option value="카이저">카이저 (Kaiser)</option>
                <option value="아이스트로">아이스트로 (Icetro)</option>
                <option value="네오트">네오트 (Neot)</option>
                <option value="세아">세아 (Se-ah / 아이스반)</option>
                <option value="ETC">기타 (직접 입력)</option>
                <option value="모름">브랜드 모름 / 확인 불가</option>
              </select>
            </div>

            {/* 기타 브랜드 입력창 */}
            {inputs.brand === "ETC" && (
              <div className="ice-input-group animate-fade-in">
                <input
                  type="text"
                  name="customBrand"
                  placeholder="브랜드명을 직접 입력해 주세요"
                  value={inputs.customBrand}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* 모델명 */}
            <div className="ice-input-group">
              <label>모델명</label>
              <input
                type="text"
                name="model"
                placeholder="예: IM-45NE, SK-50 등"
                value={inputs.model}
                onChange={handleChange}
                required
              />
            </div>

            {/* 사이즈 선택 */}
            <div className="ice-input-group">
              <label>제빙기 크기 (일일 생산량 기준)</label>
              <select
                name="size"
                value={inputs.size}
                onChange={handleChange}
                required
              >
                <option value="">크기를 선택하세요</option>
                <option value="소형">소형 (~50kg 미만, 카페 보조용)</option>
                <option value="중형">중형 (50kg ~ 150kg, 일반 카페용)</option>
                <option value="대형">대형 (150kg 이상, 대형 식당/공장)</option>
              </select>
            </div>
          </div>

          <div className="ice-modal-actions">
            <button type="button" className="btn-ice-cancel" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn-ice-save">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyStoreAddIcemachineModal;
