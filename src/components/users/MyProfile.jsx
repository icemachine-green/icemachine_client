import { useNavigate } from "react-router-dom";
import "./MyProfile.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyProfile,
  updateMyProfile,
  checkEmailDuplicate,
  withdrawUserThunk,
} from "../../store/thunks/userThunk.js";
import { clearAuthState } from "../../store/slices/authSlice.js";
import { clearUserState } from "../../store/slices/userSlice.js";
import { clearReviewState } from "../../store/slices/reviewsSlice.js";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.js";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [editType, setEditType] = useState(null);
  const [editValue, setEditValue] = useState("");
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
    if (!editValue) return false;
    if (editType === "name") return editValue === me.name;
    if (editType === "phoneNumber") return editValue === me.phoneNumber;
    if (editType === "email") return editValue === me.email;
    return false;
  };

  const isSaveDisabled = () => {
    if (!editValue.trim()) return true;
    if (isSameValue()) return true;
    if (uxError) return true;
    return false;
  };

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

      if (editType === "email" && editValue !== me.email) {
        const exists = await dispatch(checkEmailDuplicate(editValue)).unwrap();
        if (exists) {
          setServerError("이미 사용 중인 이메일입니다.");
          return;
        }
      }

      let payloadValue = editValue;
      if (editType === "phoneNumber") {
        payloadValue = formatPhoneNumber(editValue);
      }

      await dispatch(updateMyProfile({ [editType]: payloadValue })).unwrap();
      closeEditModal();
      alert("정보가 수정되었습니다.");
    } catch (error) {
      setServerError("일시적인 오류가 발생했습니다.");
    }
  };

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const openWithdrawModal = () => setIsWithdrawModalOpen(true);
  const closeWithdrawModal = () => setIsWithdrawModalOpen(false);

  const handleConfirmWithdraw = async () => {
    try {
      await dispatch(withdrawUserThunk()).unwrap();
      dispatch(clearAuthState());
      dispatch(clearUserState());
      dispatch(clearReviewState());
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (err) {
      alert("탈퇴 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="my-profile-container">
      {/* 헤더 영역: 제목이 왼쪽, 버튼이 오른쪽 */}
      <div className="my-profile-head">
        <p className="my-profile-head-title">회원정보 변경</p>
        <button
          className="my-profile-back-btn"
          onClick={() => navigate("/mypage")}
        >
          뒤로
        </button>
      </div>

      <hr className="my-profile-underline" />

      {/* 정보 리스트 */}
      {me && (
        <div className="my-profile-card-container">
          <div className="my-profile-card">
            <label className="my-profile-card-text">이름</label>
            <div className="my-profile-card-content">
              <span className="my-profile-card-value">{me.name}</span>
              <button
                className="my-profile-change-btn"
                onClick={() => openEditModal("name")}
              >
                변경
              </button>
            </div>
          </div>

          <div className="my-profile-card">
            <label className="my-profile-card-text">전화번호</label>
            <div className="my-profile-card-content">
              <span className="my-profile-card-value">{me.phoneNumber}</span>
              <button
                className="my-profile-change-btn"
                onClick={() => openEditModal("phoneNumber")}
              >
                변경
              </button>
            </div>
          </div>

          <div className="my-profile-card">
            <label className="my-profile-card-text">이메일</label>
            <div className="my-profile-card-content">
              <span className="my-profile-card-value">{me.email}</span>
              <button
                className="my-profile-change-btn"
                onClick={() => openEditModal("email")}
              >
                변경
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 정보 수정 모달 */}
      {editType && (
        <div
          className="my-profile-change-modal-overlay"
          onClick={closeEditModal}
        >
          <div
            className="my-profile-change-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="my-profile-change-modal-header">정보 수정</div>
            <div className="my-profile-modal-section-container">
              <div className="my-profile-modal-section">
                <p className="my-profile-modal-label">현재 정보</p>
                <p className="my-profile-modal-current-val">
                  {editType === "name" && me.name}
                  {editType === "phoneNumber" && me.phoneNumber}
                  {editType === "email" && me.email}
                </p>
              </div>

              <div className="my-profile-modal-section">
                <p className="my-profile-modal-label-blue">변경할 정보</p>
                <input
                  className="my-profile-modal-input"
                  value={editValue}
                  onChange={handleChange}
                  placeholder={
                    editType === "phoneNumber"
                      ? "숫자만 입력"
                      : "변경할 값 입력"
                  }
                  inputMode={editType === "phoneNumber" ? "numeric" : "text"}
                />
                {uxError && <p className="my-profile-error">{uxError}</p>}
                {serverError && (
                  <p className="my-profile-error">{serverError}</p>
                )}
                {editValue && isSameValue() && (
                  <p className="my-profile-hint">* 기존 정보와 동일합니다.</p>
                )}
              </div>
            </div>

            <div className="my-profile-change-modal-footer">
              <button
                className="my-profile-change-modal-cancel"
                onClick={closeEditModal}
              >
                취소
              </button>
              <button
                className="my-profile-change-modal-confirm"
                onClick={handleSave}
                disabled={isSaveDisabled()}
              >
                변경하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="my-profile-btn-container">
        <button className="my-profile-withdraw-btn" onClick={openWithdrawModal}>
          회원 탈퇴하기
        </button>
      </div>

      {isWithdrawModalOpen && (
        <div className="my-profile-modal-overlay" onClick={closeWithdrawModal}>
          <div
            className="my-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="my-profile-modal-header warn">알림</div>
            <div className="my-profile-modal-body">
              <p>정말 탈퇴하시겠습니까?</p>
            </div>
            <div className="my-profile-modal-footer">
              <button
                className="my-profile-modal-cancel"
                onClick={closeWithdrawModal}
              >
                취소
              </button>
              <button
                className="my-profile-modal-confirm warn"
                onClick={handleConfirmWithdraw}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
