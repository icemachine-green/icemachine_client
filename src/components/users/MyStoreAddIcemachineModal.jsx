import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createIcemachineThunk } from "../../store/thunks/icemachineThunk.js";
import "./MyStoreAddIcemachineModal.css";

const MyStoreAddIcemachineModal = ({ businessId, onClose }) => {
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
    await dispatch(createIcemachineThunk(payload));
    onClose();
  };

  return (
    <div className="MyStoreAddIcemachineModal-overlay">
      <div className="MyStoreAddIcemachineModal-content">
        <h2 className="MyStoreAddIcemachineModal-title">새 제빙기 등록</h2>
        <p className="MyStoreAddIcemachineModal-subtitle">
          정확한 정보를 입력해 주세요.
        </p>
        <form
          onSubmit={handleSubmit}
          className="MyStoreAddIcemachineModal-form"
        >
          <div className="MyStoreAddIcemachineModal-form-group">
            <label>제빙기 브랜드</label>
            <select
              name="brand"
              value={inputs.brand}
              onChange={handleChange}
              required
            >
              <option value="">브랜드를 선택하세요</option>
              <option value="호시자키">호시자키(Hoshizaki)</option>
              <option value="카이저">카이저(Kaiser)</option>
              <option value="아이스트로">아이스트로(Icetro)</option>
              <option value="네오트">네오트(Neot)</option>
              <option value="세아">세아(Se-ah)</option>
              <option value="ETC">기타 (직접 입력)</option>
              <option value="모름">모름</option>
            </select>
          </div>
          {inputs.brand === "ETC" && (
            <div className="MyStoreAddIcemachineModal-form-group">
              <input
                type="text"
                name="customBrand"
                placeholder="브랜드명 직접 입력"
                value={inputs.customBrand}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="MyStoreAddIcemachineModal-form-group">
            <label>모델명</label>
            <input
              type="text"
              name="model"
              placeholder="예: IM-45NE"
              value={inputs.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="MyStoreAddIcemachineModal-form-group">
            <label>사이즈(일일 생산량)</label>
            <select
              name="size"
              value={inputs.size}
              onChange={handleChange}
              required
            >
              <option value="">사이즈를 선택하세요</option>
              <option value="소형">소형(~50kg)</option>
              <option value="중형">중형(51~150kg)</option>
              <option value="대형">대형(151kg~)</option>
            </select>
          </div>
          <div className="MyStoreAddIcemachineModal-actions">
            <button
              type="submit"
              className="MyStoreAddIcemachineModal-submit-btn"
            >
              등록하기
            </button>
            <button
              type="button"
              className="MyStoreAddIcemachineModal-cancel-btn"
              onClick={onClose}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyStoreAddIcemachineModal;
