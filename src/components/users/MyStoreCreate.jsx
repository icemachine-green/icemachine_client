import { useNavigate } from 'react-router-dom';
import './MyStoreCreate.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBusinessThunk } from '../../store/thunks/businessThunk';
import { clearBusinessState } from '../../store/slices/businessSlice';

const MyStoreCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태 선택
  const { status: businessStatus, error: businessError, business: businessResult } = useSelector(state => state.business);

  // 입력 상태 관리
  const [businessInputs, setBusinessInputs] = useState({ name: '', managerName: '', phoneNumber: '', mainAddress: '', detailedAddress: '' });
  const [iceMachineInputs, setIceMachineInputs] = useState({ brand: '', model: '', size: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 입력 핸들러
  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setBusinessInputs(prev => ({ ...prev, [name]: value }));
  };
  const handleIceMachineChange = (e) => {
    const { name, value } = e.target;
    setIceMachineInputs(prev => ({ ...prev, [name]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    dispatch(createBusinessThunk({ businessData: businessInputs, iceMachineData: iceMachineInputs }));
  };

  // 매장 등록 성공 시 -> 모달 띄우기
  useEffect(() => {
    if (businessStatus === 'succeeded' && businessResult?.data?.id) {
      setIsModalOpen(true);
    }
  }, [businessStatus, businessResult]);

  // 에러 처리
  useEffect(() => {
    if (businessError) {
      alert("매장 등록에 실패했습니다: " + (businessError.message || '서버 오류'));
      dispatch(clearBusinessState());
    }
  }, [businessError, dispatch]);

  // 모달 확인 버튼 핸들러
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    dispatch(clearBusinessState());
    // 상세 페이지 라우트가 아직 동적이 아니므로 목록 페이지로 이동
    navigate('/mypage/stores');
  };

  const redirectMyStore = () => navigate('/mypage/stores');

  const isLoading = businessStatus === 'loading';

  return (
    <div className='my-store-create-container'>
        {/* 헤더 */}
        <div className="my-store-create-head">
          <button className="my-store-create-back-btn" onClick={redirectMyStore}>뒤로 가기</button>
          <p className="my-store-create-head-title">내 매장 정보 등록</p>
        </div>
        <hr className="my-store-create-underline" />

        {/* 카드 */}
        <div className="my-store-create-card-container">
          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>매장명 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" name="name" value={businessInputs.name} onChange={handleBusinessChange} />
            </div>
          </div>
          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>담당자명 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" name="managerName" value={businessInputs.managerName} onChange={handleBusinessChange} />
            </div>
          </div>
          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>연락처 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" name="phoneNumber" value={businessInputs.phoneNumber} onChange={handleBusinessChange} inputMode='numeric' placeholder='"-"을 제외하고 입력해주세요.'/>
            </div>
          </div>
          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>주소 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" name="mainAddress" value={businessInputs.mainAddress} onChange={handleBusinessChange} />
            </div>
          </div>
          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>상세 주소 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" name="detailedAddress" value={businessInputs.detailedAddress} onChange={handleBusinessChange} />
            </div>
          </div>

          <div className="my-store-create-icemachine-card">
            <div className="my-store-create-icemachine-text-container">
              <span className='my-store-create-icemachine-text'>제빙기 :</span>
            </div>
            <div className="my-store-create-icemachine-input-container">
              <div className='my-store-create-icemachine-input'>
                <span>브랜드</span>
                <select name="brand" value={iceMachineInputs.brand} onChange={handleIceMachineChange}>
                  <option value="">선택하세요</option>
                  <option value="HOSHIZAKI">Hoshizaki</option>
                  <option value="SCOTSMAN">Scotsman</option>
                  <option value="MANITOWOC">Manitowoc</option>
                  <option value="ICE_O_MATIC">Ice-O-Matic</option>
                  <option value="ETC">기타</option>
                  <option value="UNKNOWN">모름</option>
                </select>
              </div>
              <div className='my-store-create-icemachine-input'>
                <span>모델명</span>
                <input type="text" name="model" value={iceMachineInputs.model} onChange={handleIceMachineChange} />
              </div>
              <div className='my-store-create-icemachine-input'>
                <span>사이즈</span>
                <select name="size" value={iceMachineInputs.size} onChange={handleIceMachineChange}>
                  <option value="">선택하세요</option>
                  <option value="SMALL">소형(~50kg)</option>
                  <option value="MEDIUM">중형(51~150kg)</option>
                  <option value="LARGE">대형(151kg~)</option>
                  <option value="UNKNOWN">모름</option>
                  <option value="ETC">기타</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 등록 버튼 */}
        <div className='my-store-create-btn-container'>
          <button className='my-store-later-btn' onClick={redirectMyStore}>나중에 등록하기</button>
          <button className='my-store-create-btn' onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? '등록 중...' : '입력한 정보 등록하기'}
          </button>
        </div>
        
        {isModalOpen && (
          <div className="reservation-alert-dim"> {/* CSS 재사용 */}
            <div className="reservation-alert-modal">
              <div className="reservation-alert-header">
                <span>알림</span>
              </div>
              <div className="reservation-alert-body">
                <img src="/public/icons/checkicon.png" alt="체크" />
                <p>매장 및 제빙기 등록이 완료되었습니다.</p>
              </div>
              <button className="reservation-alert-confirm" onClick={handleModalConfirm}>
                확인
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default MyStoreCreate;