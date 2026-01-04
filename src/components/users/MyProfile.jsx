import { useNavigate } from 'react-router-dom';
import './MyProfile.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, updateMyProfile, checkEmailDuplicate, withdrawUserThunk } from "../../store/thunks/userThunk.js"
import { clearAuthState } from "../../store/slices/authSlice.js";
import { clearUserState } from "../../store/slices/userSlice.js";
import { clearReviewState } from "../../store/slices/reviewsSlice.js";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.js"

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [editType, setEditType] = useState(null); // name | phone | email
  const [editValue, setEditValue] = useState("");
  
  // 에러 분리
  const [uxError, setUxError] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    setServerError("");

    if (editType === "phoneNumber") {
      value = value.replace(/\D/g, "");
      value = value.slice(0, 11);

      if (value.length !== 11) {
        setUxError("전화번호는 11자리여야 합니다.");
      } else {
        setUxError("");
      }
    }

    if (editType === "email") {
      value = value.replace(/[^A-Za-z0-9@._%+-]/g, "");

      if (!emailRegex.test(value)) {
        setUxError("이메일 형식이 올바르지 않습니다.");
      } else {
        setUxError("");
      }
    }

    if (editType === "name") {
      setUxError("");
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
    if (uxError) return true; // 에러 존재
    return false;
  };

  // 변경 버튼 클릭시 모달 처리
  const openEditModal = (type) => {
    setEditType(type);
    setEditValue("");
    setUxError("");
    setServerError("");
  };

  const closeEditModal = () => {
    setEditType(null);
    setEditValue("");
    setUxError("");
    setServerError("");
  };

  const handleSave = async () => {
    if (editType === "phoneNumber" && editValue.length !== 11) {
      setUxError("전화번호는 11자리여야 합니다.");
      return;
    }
    
    try {
      setServerError("");

      if (uxError) return;

      // 이메일 중복 체크 (가공 x, 입력값 그대로)
      if (editType === "email" && editValue !== me.email) {
        const exists = await dispatch(
          checkEmailDuplicate(editValue)
        ).unwrap();

        if (exists) {
          setServerError("다른 사용자가 이미 사용 중인 이메일입니다.");
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
      if (error?.status === 409) {
        setServerError(error.message);
      }
      setServerError("일시적인 오류가 발생했습니다.");
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

      dispatch(clearAuthState());
      dispatch(clearUserState());
      dispatch(clearReviewState());

      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/"); // 메인
    } catch (err) {
      console.log(err);
      alert("탈퇴 처리 중 오류가 발생했습니다.");
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
                          ? "숫자만 입력 (예: 01012345678)"
                          : editType === "email"
                          ? "영문 이메일 입력 (예: test@email.com)"
                          : "변경할 값을 입력하세요"
                      }
                      maxLength={editType === "phoneNumber" ? 11 : undefined}
                      inputMode={editType === "phoneNumber" ? "numeric" : "text"}
                    />
                  </div>

                  {/* UX 에러 */}
                  {uxError && (
                    <p className="my-profile-error">{uxError}</p>
                  )}

                  {/* 서버 에러 */}
                  {serverError && (
                    <p className="my-profile-error">{serverError}</p>
                  )}

                  {/* 동일 값 안내 */}
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
        <div className='my-profile-btn-container'>
          <button className='my-profile-withdraw-btn' onClick={openWithdrawModal}>회원 탈퇴하기</button>
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