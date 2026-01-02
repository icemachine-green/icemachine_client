import { useNavigate } from 'react-router-dom';
import './MyProfile.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, updateMyProfile, checkEmailDuplicate, withdrawUserThunk } from "../../store/thunks/userThunk.js"
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.js"

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [editType, setEditType] = useState(null); // name | phone | email
  const [editValue, setEditValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;

    if (editType === "phoneNumber") {
      value = value.replace(/\D/g, ""); // 숫자만 허용
    }

    setEditValue(value);
  };

  const isSameValue = () => {
    if(!editValue) return false;

    if (editType === "name") return editValue === me.name;
    if (editType === "phoneNumber") return editValue === me.phoneNumber;
    if (editType === "email") return editValue === me.email;

    return false;
  }

  const isSaveDisabled = () => {
    if (!editValue.trim()) return true; // NOT NULL
    if (isSameValue()) return true; // 동일 값
    if (errorMessage) return true; // 에러 존재
    return false;
  };

  // 변경 버튼 클릭시 모달 처리
  const openEditModal = (type) => {
    setEditType(type);
    setEditValue("");
    setErrorMessage("");
  };

  const closeEditModal = () => {
    setEditType(null);
    setEditValue("");
    setErrorMessage("");
  };

  const handleSave = async () => {
    try {
      // 이메일 중복 체크 (가공 x, 입력값 그대로)
      if (editType === "email" && editValue !== me.email) {
        const exists = await dispatch(
          checkEmailDuplicate(editValue)
        ).unwrap();

        if (exists) {
          setErrorMessage("다른 사용자가 이미 사용 중인 이메일입니다.");
          return;
        }
      }

      // 백엔드로 보낼 값 가공
      let payloadValue = editValue;

      if (editType === "phoneNumber") {
        payloadValue = formatPhoneNumber(editValue);
      }

      await dispatch(
        updateMyProfile({ [editType]: payloadValue })
      ).unwrap();

      closeEditModal();
      alert("정보가 수정되었습니다.");
    } catch (error) {
      console.error(error);
      alert("수정 실패");
    }
  };

  // 회원 탈퇴 버튼 클릭시 모달 처리
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const openWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const closeWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };

  const handleConfirmWithdraw = async () => {
    try {
      await dispatch(withdrawUserThunk()).unwrap();
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/"); // 메인
    } catch (err) {
      alert(err);
    }
  };

  // 뒤로 가기 버튼
  function redirectMyPage() {
    return navigate('/mypage');
  };

  return (
    <div className='my-profile-container'>

        {/* 헤더 */}
        <div className="my-profile-head">
          <button className="my-profile-back-btn" onClick={redirectMyPage}>뒤로 가기</button>
            <p className="my-profile-head-title">회원정보 변경</p>
        </div>

        {/* 가로선 */}
        <hr className="my-profile-underline" />

        {/* 정보 카드 */}
        {me && (
          <div className="my-profile-card-container">

            <div className="my-profile-card">
              <span className='my-profile-card-text'>이름 :</span>
              <div className='my-profile-card-input'>
                <span>{me.name}</span>
                <button className="my-profile-change-btn" onClick={() => openEditModal("name")}>변경</button>
              </div>
            </div>

            <div className="my-profile-card">
              <span className='my-profile-card-text'>전화번호 :</span>
              <div className='my-profile-card-input'>
                <span>{me.phoneNumber}</span>
                <button className="my-profile-change-btn" onClick={() => openEditModal("phoneNumber")}>변경</button>
              </div>
            </div>

            <div className="my-profile-card">
              <span className='my-profile-card-text'>이메일 :</span>
              <div className='my-profile-card-input'>
                <span>{me.email}</span>
                <button className="my-profile-change-btn" onClick={() => openEditModal("email")}>변경</button>
              </div>
            </div>

          </div>
        )}

        {/* 정보 변경 모달 */}
        {editType && (
          <div className="my-profile-change-modal-overlay" onClick={closeEditModal}>
            <div className="my-profile-change-modal" onClick={(e) => e.stopPropagation()}>
              <div className="my-profile-change-modal-header">
                정보 수정
              </div>

              <div className="my-profile-modal-section-container">
                {/* 현재 정보 */}
                <div className="my-profile-modal-section">
                  <p className="my-profile-modal-label">현재 정보</p>
                  <div className="my-profile-modal-row">
                    <span className="my-profile-modal-key">
                      {editType === "name" && "이름"}
                      {editType === "phoneNumber" && "전화번호"}
                      {editType === "email" && "이메일"}
                      {" : "}
                    </span>
                    <span className="my-profile-modal-value">
                      {editType === "name" && me.name}
                      {editType === "phoneNumber" && me.phoneNumber}
                      {editType === "email" && me.email}
                    </span>
                  </div>
                </div>

                {/* 변경할 정보 */}
                <div className="my-profile-modal-section">
                  <p className="my-profile-modal-label-blue">변경할 정보</p>
                  <div className="my-profile-modal-row">
                    <span className="my-profile-modal-key">
                      {editType === "name" && "이름"}
                      {editType === "phoneNumber" && "전화번호"}
                      {editType === "email" && "이메일"}
                      {" : "}
                    </span>

                    <input
                      className="my-profile-modal-input"
                      value={editValue}
                      onChange={handleChange}
                      placeholder={
                        editType === "phoneNumber"
                          ? "숫자만 입력(예: 01012345678)"
                          : "변경할 값을 입력하세요"
                      }
                      maxLength={editType === "phoneNumber" ? 11 : undefined}
                      inputMode={editType === "phoneNumber" ? "numeric" : "text"}
                    />
                  </div>

                  {/* 서버/비즈니스 에러 */}
                  {errorMessage && (
                    <p className="my-profile-error">{errorMessage}</p>
                  )}
                  {/* UX 안내 */}
                  {editValue && isSameValue() && (
                    <p className="my-profile-hint">
                      * 기존 정보와 동일한 값입니다.
                    </p>
                  )}
                </div>
              </div>

              <div className="my-profile-change-modal-footer">
                <button
                  className="my-profile-change-modal-confirm"
                  onClick={handleSave}
                  disabled={isSaveDisabled()}
                >
                  변경하기
                </button>
                <button
                  className="my-profile-change-modal-cancel"
                  onClick={closeEditModal}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

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