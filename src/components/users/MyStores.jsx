import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBusinessesThunk } from '../../store/thunks/businessThunk';
import './MyStores.css';

const MyStores = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 스토어에서 매장 목록 관련 상태를 가져옵니다.
  const { businessesList, listStatus, listError } = useSelector((state) => state.business);

  useEffect(() => {
    // 컴포넌트 마운트 시 매장 목록을 불러옵니다.
    dispatch(getBusinessesThunk());
  }, [dispatch]);

  const redirectMyPage = () => navigate('/mypage');
  const redirectMyStoreCreate = () => navigate('/mypage/stores/create');

  // 로딩 중이거나 에러 발생 시 UI
  if (listStatus === 'loading') {
    return <div className="my-stores-container"><div>로딩 중...</div></div>;
  }
  if (listError) {
    return <div className="my-stores-container"><div>매장 목록을 불러오는 데 실패했습니다: {listError.message || '알 수 없는 오류'}</div></div>;
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

      {/* 매장 추가 버튼 */}
      <div className='my-stores-add-btn-container'> {/* 이 컨테이너는 CSS에 맞게 조정 필요 */}
        <button className='my-stores-card-new-btn' onClick={redirectMyStoreCreate}>+ 매장 새로 등록</button>
      </div>

      {/* 매장 목록 카드 */}
      <div className="my-stores-card-list"> {/* 새로운 컨테이너 클래스 추가 */}
        {businessesList.length > 0 ? (
          businessesList.map((store) => (
            <div className="my-stores-card" key={store.id} onClick={() => navigate(`/mypage/stores/${store.id}`)}>
              <div className='my-stores-card-img-container'>
                <img src="/icons/cafeicon.png" alt="매장" className='my-store-card-img'/>
              </div>
              <div className='my-stores-card-info'>
                <p className='my-stores-card-name'>{store.name}</p>
                <p className='my-stores-card-address'>{store.mainAddress}</p>
                <p className='my-stores-card-phone'>{store.phoneNumber}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="my-stores-no-stores">
            <p>등록된 매장이 없습니다.</p>
            <p>새로운 매장을 등록해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStores;