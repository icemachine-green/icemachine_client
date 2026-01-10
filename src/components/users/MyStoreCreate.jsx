import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBusinessThunk } from "../../store/thunks/businessThunk";
import { clearBusinessState } from "../../store/slices/businessSlice";
import AddressSearchModal from "./AddressSearchModal.jsx";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.js";
import "./MyStoreCreate.css";
import "../common/CommonStyles.css";

/**
 * @file MyStoreCreate.jsx
 * @description 매장 및 제빙기 통합 등록 컴포넌트
 */
const MyStoreCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태 선택
  const { createStatus } = useSelector((state) => state.business);

  // 주소 검색 모달 및 성공 알림 모달 상태
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. 매장 입력 상태
  const [businessInputs, setBusinessInputs] = useState({
    name: "",
    managerName: "",
    phoneNumber: "",
    mainAddress: "",
    detailedAddress: "",
  });

  // 2. 제빙기 입력 상태
  const [iceMachineInputs, setIceMachineInputs] = useState({
    brand: "",
    model: "",
    size: "소형",
  });

  // 매장 입력 핸들러
  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

    if (name === "phoneNumber") {
      nextValue = value.replace(/\D/g, "").slice(0, 11);
    }

    setBusinessInputs((prev) => ({ ...prev, [name]: nextValue }));
  };

  // 제빙기 입력 핸들러
  const handleIceMachineChange = (e) => {
    const { name, value } = e.target;
    setIceMachineInputs((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    try {
      if (!businessInputs.name || !businessInputs.mainAddress) {
        alert("매장명과 주소는 필수 입력 항목입니다.");
        return;
      }

      if (businessInputs.phoneNumber.length !== 11) {
        alert("전화번호 11자리를 정확히 입력해 주세요.");
        return;
      }

      // 전화번호 포맷팅
      let businessPayload = { ...businessInputs };
      businessPayload.phoneNumber = formatPhoneNumber(
        businessInputs.phoneNumber
      );

      // Thunk 실행
      await dispatch(
        createBusinessThunk({
          businessData: businessPayload,
          iceMachineData: iceMachineInputs,
        })
      ).unwrap();

      setIsModalOpen(true);
    } catch (err) {
      console.error("등록 실패 상세:", err);
      alert("매장 등록에 실패했습니다: " + (err.message || "서버 오류"));
    }
  };

  // 성공 모달 확인 버튼
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    dispatch(clearBusinessState());
    navigate("/mypage/stores");
  };

  const redirectMyStore = () => {
    dispatch(clearBusinessState());
    navigate("/mypage/stores");
  };

  const isLoading = createStatus === "loading";

  return (
    <div className="my-store-create-container">
      {/* 헤더: 공통 CSS 및 우측 뒤로가기 배치 */}
      <div className="common-page-head">
        <p className="my-store-create-head-title">내 매장 등록</p>
        <button className="common-btn-back" onClick={redirectMyStore}>
          <span>〈</span> 뒤로 가기
        </button>
      </div>

      <hr className="my-store-create-underline" />

      <div className="my-store-create-form-wrapper">
        {/* 섹션 1: 매장 기본 정보 */}
        <section className="my-store-create-section">
          <h3 className="section-title">매장 기본 정보</h3>

          <div className="input-group">
            <label>매장명</label>
            <input
              type="text"
              name="name"
              placeholder="예: 강남 아메리카노"
              value={businessInputs.name}
              onChange={handleBusinessChange}
            />
          </div>

          <div className="input-group">
            <label>담당자명</label>
            <input
              type="text"
              name="managerName"
              placeholder="이름 입력"
              value={businessInputs.managerName}
              onChange={handleBusinessChange}
            />
          </div>

          <div className="input-group">
            <label>연락처</label>
            <input
              type="text"
              name="phoneNumber"
              value={businessInputs.phoneNumber}
              onChange={handleBusinessChange}
              inputMode="numeric"
              placeholder="숫자 11자리 (010...)"
            />
          </div>

          <div className="input-group">
            <label>주소</label>
            <div className="address-input-wrapper">
              <input
                type="text"
                name="mainAddress"
                value={businessInputs.mainAddress}
                readOnly
                onClick={() => setIsOpen(true)}
                placeholder="검색 버튼을 눌러주세요"
              />
              <button
                className="addr-search-btn"
                onClick={() => setIsOpen(true)}
              >
                검색
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>상세 주소</label>
            <input
              type="text"
              name="detailedAddress"
              placeholder="층, 호수 등 상세정보"
              value={businessInputs.detailedAddress}
              onChange={handleBusinessChange}
            />
          </div>
        </section>

        {/* 섹션 2: 제빙기 정보 */}
        <section className="my-store-create-section ice-machine">
          <h3 className="section-title">제빙기 정보</h3>

          <div className="input-group">
            <label>브랜드</label>
            <select
              name="brand"
              value={iceMachineInputs.brand}
              onChange={handleIceMachineChange}
            >
              <option value="">브랜드 선택</option>
              <option value="호시자키">호시자키(Hoshizaki)</option>
              <option value="카이저">카이저(Kaiser)</option>
              <option value="아이스트로">아이스트로(Icetro)</option>
              <option value="네오트">네오트(Neot)</option>
              <option value="세아">세아(Se-ah)</option>
              <option value="직접입력">기타/직접입력</option>
            </select>
          </div>

          <div className="input-group">
            <label>모델명</label>
            <input
              type="text"
              name="model"
              placeholder="예: IM-45NE"
              value={iceMachineInputs.model}
              onChange={handleIceMachineChange}
            />
          </div>

          <div className="input-group">
            <label>사이즈</label>
            <select
              name="size"
              value={iceMachineInputs.size}
              onChange={handleIceMachineChange}
            >
              <option value="소형">소형(~50kg)</option>
              <option value="중형">중형(51~150kg)</option>
              <option value="대형">대형(151kg~)</option>
            </select>
          </div>
        </section>

        {/* 하단 버튼 영역 */}
        <div className="my-store-create-btn-container">
          <button className="my-store-later-btn" onClick={redirectMyStore}>
            나중에 하기
          </button>
          <button
            className="my-store-create-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "등록 중..." : "등록 완료"}
          </button>
        </div>
      </div>

      {/* 주소 검색 모달 */}
      {isOpen && (
        <AddressSearchModal
          onClose={() => setIsOpen(false)}
          onComplete={(data) => {
            setBusinessInputs((prev) => ({
              ...prev,
              mainAddress: data.address,
            }));
            setIsOpen(false);
          }}
        />
      )}

      {/* 성공 안내 모달 */}
      {isModalOpen && (
        <div className="reservation-alert-dim">
          <div className="reservation-alert-modal">
            <div className="reservation-alert-header">
              <span>알림</span>
            </div>
            <div className="reservation-alert-body">
              <img src="/icons/checkicon.png" alt="체크" />
              <p>매장 및 제빙기 등록이 완료되었습니다.</p>
            </div>
            <button
              className="reservation-alert-confirm"
              onClick={handleModalConfirm}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStoreCreate;
