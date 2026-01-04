import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createIcemachineThunk } from "../../store/thunks/icemachineThunk.js";
import "./MyStoreAddIcemachineModal.css";

const MyStoreAddIcemachineModal = ({ businessId, onClose }) => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    brand: "",
    size: "",
    model: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      createIcemachineThunk({
        businessId,
        icemachineData: inputs,
      })
    );
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>새 제빙기 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>브랜드</label>
            <select
              name="brand"
              value={inputs.brand}
              onChange={handleChange}
              required
            >
              <option value="">선택하세요</option>
              <option value="HOSHIZAKI">Hoshizaki</option>
              <option value="SCOTSMAN">Scotsman</option>
              <option value="MANITOWOC">Manitowoc</option>
              <option value="기타">기타</option>
              <option value="모름">모름</option>
            </select>
          </div>
          <div className="form-group">
            <label>사이즈</label>
            {/* value는 서버 규격인 '소형(~50kg)' 등을 정확히 유지합니다 */}
            <select
              name="size"
              value={inputs.size}
              onChange={handleChange}
              required
            >
              <option value="">선택하세요</option>
              <option value="소형(~50kg)">소형(~50kg)</option>
              <option value="중형(51~150kg)">중형(51~150kg)</option>
              <option value="대형(151kg~)">대형(151kg~)</option>
              <option value="모름">모름</option>
            </select>
          </div>
          <div className="form-group">
            <label>모델명</label>
            <input
              name="model"
              value={inputs.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit">등록</button>
            <button type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyStoreAddIcemachineModal;
