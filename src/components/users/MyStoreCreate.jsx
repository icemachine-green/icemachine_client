import { useNavigate } from "react-router-dom";
import "./MyStoreCreate.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBusinessThunk } from "../../store/thunks/businessThunk";
import { clearBusinessState } from "../../store/slices/businessSlice";
import AddressSearchModal from "./AddressSearchModal.jsx";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.js";

/**
 * @file MyStoreCreate.jsx
 * @description 매장 및 제빙기 통합 등록 컴포넌트 (백엔드 규격 최적화 완료)
 */
const MyStoreCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 주소 검색 모달창 관련
  const [isOpen, setIsOpen] = useState(false);

  // Redux 상태 선택
  const { createStatus } = useSelector((state) => state.business);

  // 1. 매장 입력 상태
  const [businessInputs, setBusinessInputs] = useState({
    name: "",
    managerName: "",
    phoneNumber: "",
    mainAddress: "",
    detailedAddress: "",
  });

  // 2. 제빙기 입력 상태 (🚩 백엔드 규격에 맞춘 초기값 설정)
  const [iceMachineInputs, setIceMachineInputs] = useState({
    brand: "",
    model: "",
    size: "소형", // 기본값 설정
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        alert("전화번호는 11자리여야 합니다.");
        return;
      }

      // 전화번호 포맷팅 (01012345678 -> 010-1234-5678)
      let businessPayload = { ...businessInputs };
      businessPayload.phoneNumber = formatPhoneNumber(
        businessInputs.phoneNumber
      );

      // 🚩 Thunk 실행 (내부에서 brand_name, model_name 등으로 매핑됨)
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
      {/* 헤더 */}
      <div className="my-store-create-head">
        <button className="my-store-create-back-btn" onClick={redirectMyStore}>
          뒤로 가기
        </button>
        <p className="my-store-create-head-title">내 매장 정보 등록</p>
      </div>
      <hr className="my-store-create-underline" />

      {/* 카드 섹션 */}
      <div className="my-store-create-card-container">
        {/* 매장 정보 */}
        <div className="my-store-create-card">
          <span className="my-store-create-card-text">매장명 :</span>
          <div className="my-store-create-card-input">
            <input
              type="text"
              name="name"
              placeholder="매장 이름을 입력해 주세요"
              value={businessInputs.name}
              onChange={handleBusinessChange}
            />
          </div>
        </div>
        <div className="my-store-create-card">
          <span className="my-store-create-card-text">담당자명 :</span>
          <div className="my-store-create-card-input">
            <input
              type="text"
              name="managerName"
              placeholder="담당자 성함을 입력해 주세요"
              value={businessInputs.managerName}
              onChange={handleBusinessChange}
            />
          </div>
        </div>
        <div className="my-store-create-card">
          <span className="my-store-create-card-text">연락처 :</span>
          <div className="my-store-create-card-input">
            <input
              type="text"
              name="phoneNumber"
              value={businessInputs.phoneNumber}
              onChange={handleBusinessChange}
              inputMode="numeric"
              placeholder="숫자만 입력 (예: 01012345678)"
            />
          </div>
        </div>
        <div className="my-store-create-card">
          <span className="my-store-create-card-text">주소 :</span>
          <div className="my-store-create-card-input">
            <input
              type="text"
              name="mainAddress"
              value={businessInputs.mainAddress}
              readOnly
              onClick={() => setIsOpen(true)}
              placeholder="주소 검색을 클릭해 주세요"
            />
          </div>
        </div>
        <div className="my-store-create-card">
          <span className="my-store-create-card-text">상세 주소 :</span>
          <div className="my-store-create-card-input">
            <input
              type="text"
              name="detailedAddress"
              placeholder="나머지 상세 주소를 입력해 주세요"
              value={businessInputs.detailedAddress}
              onChange={handleBusinessChange}
            />
          </div>
        </div>

        {/* 제빙기 정보 섹션 (🚩 백엔드 시더 및 모델 규격 반영) */}
        <div className="my-store-create-icemachine-card">
          <div className="my-store-create-icemachine-text-container">
            <span className="my-store-create-icemachine-text">
              제빙기 정보 :
            </span>
          </div>
          <div className="my-store-create-icemachine-input-container">
            <div className="my-store-create-icemachine-input">
              <span>브랜드</span>
              <select
                name="brand"
                value={iceMachineInputs.brand}
                onChange={handleIceMachineChange}
              >
                <option value="">선택하세요</option>
                <option value="호시자키">호시자키(Hoshizaki)</option>
                <option value="카이저">카이저(Kaiser)</option>
                <option value="아이스트로">아이스트로(Icetro)</option>
                <option value="네오트">네오트(Neot)</option>
                <option value="세아">세아(Se-ah)</option>
                <option value="직접입력">기타/직접입력</option>
              </select>
            </div>
            <div className="my-store-create-icemachine-input">
              <span>모델명</span>
              <input
                type="text"
                name="model"
                placeholder="예: IM-45NE"
                value={iceMachineInputs.model}
                onChange={handleIceMachineChange}
              />
            </div>
            <div className="my-store-create-icemachine-input">
              <span>사이즈</span>
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
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="my-store-create-btn-container">
        <button className="my-store-later-btn" onClick={redirectMyStore}>
          나중에 등록하기
        </button>
        <button
          className="my-store-create-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "등록 중..." : "등록하기"}
        </button>
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
