import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBusinessThunk } from '../../store/thunks/businessThunk';
import './MyStoreEditModal.css';

const MyStoreEditModal = ({ business, onClose }) => {
    const dispatch = useDispatch();
    const { detailStatus } = useSelector((state) => state.business);

    const [formData, setFormData] = useState({
        name: '',
        mainAddress: '',
        detailedAddress: '',
        phoneNumber: '',
        managerName: '',
    });

    useEffect(() => {
        if (business) {
            setFormData({
                name: business.name || '',
                mainAddress: business.mainAddress || '',
                detailedAddress: business.detailedAddress || '',
                phoneNumber: business.phoneNumber || '',
                managerName: business.managerName || '',
            });
        }
    }, [business]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // businessId는 business 객체에서 가져옵니다.
        if (business && business.id) {
            // API가 기대하는 형태로 데이터를 구성
            const businessDataToSend = {
                name: formData.name,
                mainAddress: formData.mainAddress,
                detailedAddress: formData.detailedAddress,
                phoneNumber: formData.phoneNumber,
                managerName: formData.managerName,
            };
            await dispatch(updateBusinessThunk({ businessId: business.id, businessData: businessDataToSend }));
            if (detailStatus === 'succeeded') {
                onClose(); // 성공 시 모달 닫기
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>매장 정보 수정</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">매장 이름</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mainAddress">주소</label>
                        <input type="text" id="mainAddress" name="mainAddress" value={formData.mainAddress} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="detailedAddress">상세 주소</label>
                        <input type="text" id="detailedAddress" name="detailedAddress" value={formData.detailedAddress} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">매장 연락처</label>
                        <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="managerName">담당자 이름</label>
                        <input type="text" id="managerName" name="managerName" value={formData.managerName} onChange={handleChange} required />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" disabled={detailStatus === 'loading'}>
                            {detailStatus === 'loading' ? '저장 중...' : '저장'}
                        </button>
                        <button type="button" onClick={onClose} disabled={detailStatus === 'loading'}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyStoreEditModal;