import { useNavigate } from 'react-router-dom';
import './MyStores.css';

const MyStores = () => {
  const navigate = useNavigate();

  function redirectMyPage() {
    return navigate('/mypage');
  }

  function redirectMyStoreCreate() {
    return navigate('/mypage/stores/create');
  }

  function redirectMyStoreDetail() {
    return navigate('/mypage/stores/detail');
  }

  return (
    <div className='my-stores-container'>

        {/* 헤더 */}
        <div className="my-stores-head">
          <button className="my-stores-back-btn" onClick={redirectMyPage}>뒤로 가기</button>
            <p className="my-stores-head-title">내 매장 정보</p>
        </div>

        {/* 가로선 */}
        <hr className="my-stores-underline" />

        {/* 카드 */}
        <div className="my-stores-card-container"></div>
        <div className="my-stores-card">
          <div className='my-stores-card-img-container'>
            <img src="/icons/cafeicon.png" alt="매장" className='my-store-card-img'/>
          </div>
          <div className='my-stores-card-btn-container'>
            <button className='my-stores-card-new-btn' onClick={redirectMyStoreCreate}>매장 새로 등록</button>
            <button className='my-stores-card-inquiry-btn' onClick={redirectMyStoreDetail}>매장 정보 조회</button>
          </div>
        </div>
      </div>
  );
};

export default MyStores;