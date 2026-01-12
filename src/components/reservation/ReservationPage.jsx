import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getBusinessDetailThunk } from "../../store/thunks/businessThunk";
import { getIcemachinesByBusinessIdThunk } from "../../store/thunks/icemachineThunk";
import { fetchServicePoliciesThunk } from "../../store/thunks/servicePolicyThunk";
import { updateSelection, setStep } from "../../store/slices/reservationSlice";

import Step1StoreInfo from "./Step1StoreInfo.jsx";
import Step2DateTime from "./Step2DateTime.jsx";
import Step3Confirm from "./Step3Confirm.jsx";
import "./ReservationPage.css";

const ReservationPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const urlBusinessId = searchParams.get("businessId");
  const currentStep = useSelector((state) => state.reservation.currentStep);

  useEffect(() => {
    dispatch(fetchServicePoliciesThunk());

    if (urlBusinessId) {
      const bId = Number(urlBusinessId);
      dispatch(updateSelection({ businessId: bId }));
      dispatch(getBusinessDetailThunk(bId));
      dispatch(getIcemachinesByBusinessIdThunk(bId));
      dispatch(setStep(1));
    }
  }, [dispatch, urlBusinessId]);

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
    /* 부모 클래스는 이제 위치를 강제하지 않습니다. 
       자식 컴포넌트가 padding이나 margin을 자유롭게 쓸 수 있게 비워둡니다.
    */
    <div className="reservation-page-root">{renderStep()}</div>
  );
};

export default ReservationPage;
