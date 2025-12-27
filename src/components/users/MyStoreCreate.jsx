import { useNavigate } from 'react-router-dom';
import './MyStoreCreate.css';

const MyStoreCreate = () => {
  const navigate = useNavigate();

  function redirectMyStore() {
    return navigate('/mypage/stores');
  }

  return (
    <div className='my-store-create-container'>

        {/* 헤더 */}
        <div className="my-store-create-head">
          <button className="my-store-create-back-btn" onClick={redirectMyStore}>뒤로 가기</button>
            <p className="my-store-create-head-title">내 매장 정보 등록</p>
        </div>

        {/* 가로선 */}
        <hr className="my-store-create-underline" />

        {/* 카드 */}
        <div className="my-store-create-card-container">

          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>매장명 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" />
              {/* <button className="my-store-create-change-btn">등록</button> */}
            </div>
          </div>

          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>연락처 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" inputMode='numeric' />
            </div>
          </div>

          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>주소 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" />
            </div>
          </div>

          <div className="my-store-create-card">
            <span className='my-store-create-card-text'>상세 주소 :</span>
            <div className='my-store-create-card-input'>
              <input type="text" />
            </div>
          </div>

          <div className="my-store-create-icemachine-card">
            <div className="my-store-create-icemachine-text-container">
              <span className='my-store-create-icemachine-text'>제빙기 :</span>
            </div>
            <div className="my-store-create-icemachine-input-container">
              <div className='my-store-create-icemachine-input'>
                <span>브랜드</span>
                <input type="text" />
              </div>
              <div className='my-store-create-icemachine-input'>
                <span>모델명</span>
                <input type="text" />
              </div>
              <div className='my-store-create-icemachine-input'>
                <span>사이즈</span>
                <input type="text" />
              </div>
            </div>

          </div>

        </div>

        {/* 등록 버튼 */}
        <div className='my-store-create-btn-container'>
          <button className='my-store-create-btn'>매장 정보 등록하기</button>
        </div>
        
      </div>
  );
};

export default MyStoreCreate;