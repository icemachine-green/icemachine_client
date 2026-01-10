import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyReservationsThunk } from "../../store/thunks/reservationThunk";
import { fetchServicePoliciesThunk } from "../../store/thunks/servicePolicyThunk";
import { getBusinessesThunk } from "../../store/thunks/businessThunk";
import html2canvas from "html2canvas";
import jspdf from "jspdf";
import "./MyReservationTable.css";

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

  const displayData = reservationId
    ? myReservations.filter((r) => String(r.id) === String(reservationId))
    : myReservations;

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save(`예약상세_${reservationId || "내역"}.pdf`);
    } catch (error) {
      console.error("PDF 생성 오류:", error);
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "PENDING":
        return { text: "승인 대기", class: "pending" };
      case "CONFIRMED":
        return { text: "예약 완료", class: "confirmed" };
      case "START":
        return { text: "서비스 중", class: "progress" };
      case "COMPLETED":
        return { text: "서비스 완료", class: "complete" };
      case "CANCELED":
        return { text: "취소됨", class: "canceled" };
      default:
        return { text: status, class: "" };
    }
  };

  return (
    <div className="MyReservationTable-div-container">
      <div className="MyReservationTable-div-head">
        <div className="MyReservationTable-div-head-left">
          <button
            className="MyReservationTable-button-back"
            onClick={() => navigate(-1)}
          >
            ← 뒤로 가기
          </button>
          <h2 className="MyReservationTable-h2-title">예약 상세 내역</h2>
        </div>
        {reservationId && (
          <button
            className="MyReservationTable-button-download"
            onClick={handleDownloadPDF}
          >
            PDF 영수증 저장
          </button>
        )}
      </div>

      <hr className="MyReservationTable-hr-underline" />

      <div className="MyReservationTable-print-area" ref={printRef}>
        <div className="MyReservationTable-div-wrapper">
          <div className="MyReservationTable-div-header">
            <div className="MyReservationTable-div-th">방문 일정</div>
            <div className="MyReservationTable-div-th">서비스 및 기기</div>
            <div className="MyReservationTable-div-th">매장 및 장소</div>
            <div className="MyReservationTable-div-th">엔지니어</div>
            <div className="MyReservationTable-div-th">결제 및 상태</div>
          </div>

          {apiStatus === "loading" || policyStatus === "loading" ? (
            <div className="MyReservationTable-div-message">로딩 중...</div>
          ) : displayData.length > 0 ? (
            displayData.map((res) => {
              const statusInfo = getStatusDisplay(res.status);
              const policy = policyItems.find(
                (p) => String(p.id) === String(res.servicePolicyId)
              );
              const business = businessesList.find(
                (b) => String(b.id) === String(res.businessId)
              );
              const machine = business?.IceMachines?.find(
                (m) => String(m.id) === String(res.iceMachineId)
              );

              return (
                <div key={res.id} className="MyReservationTable-div-row">
                  <div className="MyReservationTable-div-td date-cell">
                    <div className="cell-content">
                      <strong className="main-text">{res.reservedDate}</strong>
                      <p className="sub-text highlight-orange">
                        {res.serviceWindow}
                      </p>
                    </div>
                  </div>

                  <div className="MyReservationTable-div-td info-cell">
                    <div className="cell-content">
                      <p className="main-text">
                        {policy?.serviceType}
                        <span className="policy-desc">
                          ({policy?.description})
                        </span>
                      </p>
                      {policy?.note && (
                        <p className="note-highlight">※ {policy.note}</p>
                      )}
                      <p className="sub-text">
                        {machine
                          ? `${machine.brandName} ${machine.modelName} (${machine.sizeType})`
                          : `규격: ${policy?.sizeType || "-"}`}
                      </p>
                    </div>
                  </div>

                  <div className="MyReservationTable-div-td business-cell">
                    <div className="cell-content">
                      <p className="main-text">{business?.name}</p>
                      <div className="address-box">
                        <p className="sub-text">{business?.mainAddress}</p>
                        <p className="sub-text">
                          T. {business?.phoneNumber} |{" "}
                          {business?.managerName || user?.name}님
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="MyReservationTable-div-td engineer-cell">
                    <div className="cell-content">
                      {res.engineerName ? (
                        <>
                          <strong className="main-text">
                            {res.engineerName} 기사님
                          </strong>
                          <p className="sub-text">{res.engineerPhone}</p>
                        </>
                      ) : (
                        <span className="waiting-text">배정 진행 중</span>
                      )}
                    </div>
                  </div>

                  <div className="MyReservationTable-div-td status-cell">
                    <div className="cell-content">
                      <span
                        className={`MyReservationTable-span-badge ${statusInfo.class}`}
                      >
                        {statusInfo.text}
                      </span>
                      <strong className="price-text">
                        {Number(policy?.price || 0).toLocaleString()}원
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="MyReservationTable-div-message">
              예약 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReservationTable;
