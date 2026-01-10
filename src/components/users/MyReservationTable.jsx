import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyReservationsThunk } from "../../store/thunks/reservationThunk";
import { fetchServicePoliciesThunk } from "../../store/thunks/servicePolicyThunk";
import { getBusinessesThunk } from "../../store/thunks/businessThunk";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import "./MyReservationTable.css";
import "../common/CommonStyles.css"; // 공통 CSS 임포트

const MyReservationTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reservationId } = useParams();
  const printRef = useRef();

  const { user } = useSelector((state) => state.auth);
  const { myReservations, status: apiStatus } = useSelector(
    (state) => state.reservation
  );
  const { items: policyItems, status: policyStatus } = useSelector(
    (state) => state.servicePolicy
  );
  const { businessesList } = useSelector((state) => state.business);

  useEffect(() => {
    if (user?.id && myReservations.length === 0) {
      dispatch(fetchMyReservationsThunk({ userId: user.id, status: "ALL" }));
    }
    if (policyStatus === "idle") {
      dispatch(fetchServicePoliciesThunk());
    }
    if (businessesList.length === 0) {
      dispatch(getBusinessesThunk());
    }
  }, [
    user?.id,
    myReservations.length,
    policyStatus,
    businessesList.length,
    dispatch,
  ]);

  const reservation = myReservations.find(
    (r) => String(r.id) === String(reservationId)
  );
  const policy = policyItems.find(
    (p) => String(p.id) === String(reservation?.servicePolicyId)
  );
  const business = businessesList.find(
    (b) => String(b.id) === String(reservation?.businessId)
  );

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`예약상세_${reservationId}.pdf`);
    } catch (error) {
      console.error("PDF 생성 오류:", error);
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "CONFIRMED":
        return { text: "예약 완료", class: "confirmed" };
      case "COMPLETED":
        return { text: "서비스 완료", class: "complete" };
      case "CANCELED":
        return { text: "취소됨", class: "canceled" };
      default:
        return { text: "진행 중", class: "progress" };
    }
  };

  if (apiStatus === "loading")
    return (
      <div className="MyReservationTable-div-loading-box">
        정보를 불러오는 중입니다...
      </div>
    );
  if (!reservation)
    return (
      <div className="MyReservationTable-div-loading-box">
        데이터를 찾을 수 없습니다.
      </div>
    );

  const statusInfo = getStatusDisplay(reservation.status);

  return (
    <div className="MyReservationTable-div-container">
      {/* 공통 헤더 적용: 뒤로가기(좌) / PDF 저장(우) */}
      <div className="common-page-head">
        <button
          className="MyReservationTable-button-pdf"
          onClick={handleDownloadPDF}
        >
          PDF 저장
        </button>
        <button className="common-btn-back" onClick={() => navigate(-1)}>
          <span>〈</span> 뒤로 가기
        </button>
      </div>

      <div className="MyReservationTable-div-receipt-wrapper" ref={printRef}>
        <div className="MyReservationTable-div-status-header">
          <span className={`MyReservationTable-span-badge ${statusInfo.class}`}>
            {statusInfo.text}
          </span>
          <span className="MyReservationTable-span-no">
            No.{reservation.id}
          </span>
        </div>

        <h2 className="MyReservationTable-h2-title">예약 상세 내역</h2>

        <div className="MyReservationTable-div-main-section">
          <h1 className="MyReservationTable-h1-service-name">
            {policy?.serviceType}
          </h1>
          <p className="MyReservationTable-p-service-date">
            {reservation.reservedDate}
          </p>
          <p className="MyReservationTable-p-service-time">
            {reservation.serviceWindow}
          </p>
        </div>

        <div className="MyReservationTable-div-divider"></div>

        <div className="MyReservationTable-div-info-list">
          <div className="MyReservationTable-div-info-item">
            <span className="MyReservationTable-span-label">서비스 규격</span>
            <span className="MyReservationTable-span-value">
              {policy?.sizeType}
            </span>
          </div>
          <div className="MyReservationTable-div-info-item">
            <span className="MyReservationTable-span-label">방문 매장</span>
            <span className="MyReservationTable-span-value">
              {business?.name}
            </span>
          </div>
          <div className="MyReservationTable-div-info-item">
            <span className="MyReservationTable-span-label">매장 주소</span>
            <span className="MyReservationTable-span-value address">
              {business?.mainAddress}
            </span>
          </div>
          <div className="MyReservationTable-div-info-item">
            <span className="MyReservationTable-span-label">담당 엔지니어</span>
            <span className="MyReservationTable-span-value">
              {reservation.engineerName
                ? `${reservation.engineerName} 기사님`
                : "배정 진행 중"}
            </span>
          </div>
        </div>

        <div className="MyReservationTable-div-payment-box">
          <div className="MyReservationTable-div-payment-row">
            <span className="MyReservationTable-span-payment-label">
              결제 예정 금액
            </span>
            <span className="MyReservationTable-span-payment-value">
              {Number(policy?.price || 0).toLocaleString()}원
            </span>
          </div>
          {policy?.note && (
            <p className="MyReservationTable-p-payment-note">※ {policy.note}</p>
          )}
        </div>

        <p className="MyReservationTable-p-footer-msg">
          정기 점검 및 청결 관리를 통해 기기 수명을 연장하세요.
        </p>
      </div>
    </div>
  );
};

export default MyReservationTable;
