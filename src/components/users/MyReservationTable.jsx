import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyReservationsThunk } from "../../store/thunks/reservationThunk";
import { fetchServicePoliciesThunk } from "../../store/thunks/servicePolicyThunk";
import { getBusinessesThunk } from "../../store/thunks/businessThunk";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import "./MyReservationTable.css";
import "../common/CommonStyles.css";

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

  // --- 🚩 PDF 저장 로직 수정: 긴 세로 대응 ---
  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      // 1. 캔버스 생성 (모바일 해상도 고려하여 scale 유지)
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true, // 이미지 깨짐 방지
        logging: false,
        backgroundColor: "#ffffff", // 배경색 강제 지정
      });

      const imgData = canvas.toDataURL("image/png");

      // 2. 가로(w), 세로(h) 비율 계산
      const imgWidth = 210; // A4 가로 mm
      const pageHeight = 297; // A4 세로 mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 3. jspdf 인스턴스 생성 (콘텐츠가 A4보다 길면 긴 대로 생성)
      // 'p' (portrait), 'mm' (unit), [가로, 세로] (커스텀 사이즈)
      const pdf = new jspdf("p", "mm", [
        imgWidth,
        imgHeight > pageHeight ? imgHeight : pageHeight,
      ]);

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`예약상세_영수증_${reservationId}.pdf`);
    } catch (error) {
      console.error("PDF 생성 오류:", error);
      alert("PDF 생성 중 오류가 발생했습니다.");
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

      {/* 영수증 스타일의 컨테이너 */}
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
            <span className="MyReservationTable-span-label">
              결제 예정 금액
            </span>
            <span className="MyReservationTable-span-value">
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
