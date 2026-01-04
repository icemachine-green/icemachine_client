import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// Thunk 및 Action 임포트 (경로는 프로젝트 구조에 맞게 확인)
import { getBusinessDetailThunk } from "../../store/thunks/businessThunk";
import { getIcemachinesByBusinessIdThunk } from "../../store/thunks/icemachineThunk";
import { updateSelection, setStep } from "../../store/slices/reservationSlice";

// Step 컴포넌트들
import Step1StoreInfo from "./Step1StoreInfo.jsx";
import Step2DateTime from "./Step2DateTime.jsx";
import Step3Confirm from "./Step3Confirm.jsx";
import "./ReservationPage.css";

const ReservationPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  // URL에서 businessId 추출
  const urlBusinessId = searchParams.get("businessId");

  // Redux 상태 구독
  const currentStep = useSelector((state) => state.reservation.currentStep);

  useEffect(() => {
    if (urlBusinessId) {
      const bId = Number(urlBusinessId);

      // 1. Redux의 selection 상태에 businessId 미리 저장
      dispatch(updateSelection({ businessId: bId }));

      // 2. 해당 매장의 정보를 서버에서 불러오기
      dispatch(getBusinessDetailThunk(bId));
      dispatch(getIcemachinesByBusinessIdThunk(bId));

      // 3. 진입 시 1단계로 강제 설정 (보장용)
      dispatch(setStep(1));
    }
  }, [dispatch, urlBusinessId]);

  // 단계별 렌더링
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1StoreInfo />;
      case 2:
        return <Step2DateTime />;
      case 3:
        return <Step3Confirm />;
      default:
        return <Step1StoreInfo />;
    }
  };

  return (
    <div className="reservationpage-container">
      {/* 상단 헤더 이미지 */}
      <div className="reservationpage-img">
        <img src="/icons/blue-ice_1440.png" alt="reservation header" />
      </div>

      {/* 단계 표시 헤더 */}
      <div className="reservationpage-head">
        <p className="reservationpage-head-title">
          제빙기 예약 ({currentStep}/3)
        </p>
      </div>

      <hr className="reservationpage-underline" />

      {/* 컨텐츠 영역 */}
      <div className="reservationpage-content">{renderStep()}</div>
    </div>
  );
};

export default ReservationPage;
