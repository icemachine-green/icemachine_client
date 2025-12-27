import { useNavigate } from 'react-router-dom';
import './MyProfile.css';
import { useState } from 'react';

const MyProfile = () => {
  const navigate = useNavigate();

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const openWithdrawModal = () => {
      setIsWithdrawModalOpen(true);
    };
  
    const closeWithdrawModal = () => {
      setIsWithdrawModalOpen(false);
    };
  
    const handleConfirmWithdraw = () => {
      alert("정상적으로 탈퇴 처리되었습니다.");
      setIsWithdrawModalOpen(false);
    };

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
        <div className='my-profile-btn-container' onClick={openWithdrawModal}>
          <button className='my-profile-withdraw-btn'>회원 탈퇴하기</button>
        </div>

        {/* 회원 탈퇴 모달 */}
        {isWithdrawModalOpen && (
          <div className="my-profile-modal-overlay">
            <div className="my-profile-modal">

              <div className="my-profile-modal-header">
                알림
              </div>

              <div className="my-profile-modal-body">
                <div className="my-profile-modal-icon">
                  <img src="/public/icons/information-button.png"
                    alt="알림"
                    className="my-profile-modal-icon-img"/>
                </div>
                <p>정말 탈퇴하시겠습니까?</p>
              </div>

              <div className="my-profile-modal-footer">
                <button
                  className="my-profile-modal-confirm"
                  onClick={handleConfirmWithdraw}
                >
                  확인
                </button>
                <button
                  className="my-profile-modal-cancel"
                  onClick={closeWithdrawModal}
                >
                  취소
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
  );
};

export default MyProfile;