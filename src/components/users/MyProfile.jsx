import { useNavigate } from 'react-router-dom';
import './MyProfile.css';

const MyProfile = () => {
  const navigate = useNavigate();

  function redirectMyPage() {
    return navigate('/mypage');
  }

  return (
    <div className='my-profile-container'>

        {/* 헤더 */}
        <div className="my-profile-head">
          <button className="my-profile-back-btn" onClick={redirectMyPage}>뒤로 가기</button>
            <p className="my-profile-head-title">회원정보 변경</p>
        </div>

        {/* 가로선 */}
        <hr className="my-profile-underline" />

        {/* 입력 영역 */}
        <div className="my-profile-card-container">

          <div className="my-profile-card">
            <span className='my-profile-card-text'>이름 :</span>
            <div className='my-profile-card-input'>
              <input type="text" />
              <button className="my-profile-change-btn">변경</button>
            </div>
          </div>

          <div className="my-profile-card">
            <span className='my-profile-card-text'>전화번호 :</span>
            <div className='my-profile-card-input'>
              <input type="text" inputMode='numeric' />
              <button className="my-profile-change-btn">변경</button>
            </div>
          </div>

          <div className="my-profile-card">
            <span className='my-profile-card-text'>이메일 :</span>
            <div className='my-profile-card-input'>
              <input type="text" />
              <button className="my-profile-change-btn">변경</button>
            </div>
          </div>

        </div>

        {/* 회원 탈퇴 버튼 */}
        <div className='my-profile-btn-container'>
          <button className='my-profile-withdraw-btn'>회원 탈퇴하기</button>
        </div>

      </div>
  );
};

export default MyProfile;