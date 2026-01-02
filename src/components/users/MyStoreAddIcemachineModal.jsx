import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createIcemachineThunk } from '../../store/thunks/icemachineThunk';
import './MyStoreAddIcemachineModal.css';

const MyStoreAddIcemachineModal = ({ businessId, onClose }) => {
    const dispatch = useDispatch();
    const { addStatus } = useSelector((state) => state.icemachine);

    const [icemachineInputs, setIcemachineInputs] = useState({
        modelType: '',
        sizeType: '',
        modelName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIcemachineInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (businessId && icemachineInputs.modelType && icemachineInputs.sizeType && icemachineInputs.modelName) {
            await dispatch(createIcemachineThunk({ businessId, icemachineData: icemachineInputs }));
            if (addStatus === 'succeeded') {
                onClose(); // 성공 시 모달 닫기
            }
        } else {
            alert('모든 제빙기 정보를 입력해주세요.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>새 제빙기 등록</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="modelType">브랜드</label>
                        <select name="modelType" value={icemachineInputs.modelType} onChange={handleChange} required>
                            <option value="">선택하세요</option>
                            <option value="HOSHIZAKI">Hoshizaki</option>
                            <option value="SCOTSMAN">Scotsman</option>
                            <option value="MANITOWOC">Manitowoc</option>
                            <option value="ICE_O_MATIC">Ice-O-Matic</option>
                            <option value="ETC">기타</option>
                            <option value="UNKNOWN">모름</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sizeType">사이즈</label>
                        <select name="sizeType" value={icemachineInputs.sizeType} onChange={handleChange} required>
                            <option value="">선택하세요</option>
                            <option value="SMALL">소형(~50kg)</option>
                            <option value="MEDIUM">중형(51~150kg)</option>
                            <option value="LARGE">대형(151kg~)</option>
                            <option value="UNKNOWN">모름</option>
                            <option value="ETC">기타</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="modelName">모델명</label>
                        <input type="text" id="modelName" name="modelName" value={icemachineInputs.modelName} onChange={handleChange} placeholder="제빙기 모델명을 입력하세요" required />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" disabled={addStatus === 'loading'}>
                            {addStatus === 'loading' ? '등록 중...' : '등록'}
                        </button>
                        <button type="button" onClick={onClose} disabled={addStatus === 'loading'}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyStoreAddIcemachineModal;