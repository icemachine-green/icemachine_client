import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyReservationsThunk } from "../../store/thunks/reservationThunk";
import { SERVICE_POLICY_MAP } from "../../constants/servicePolicy";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./MyReservationTable.css";

const MyReservationTablePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reservationId } = useParams();
  const printRef = useRef(); // PDF로 출력할 영역 지정

  const { user } = useSelector((state) => state.auth);
  const { myReservations, status: apiStatus } = useSelector(
    (state) => state.reservation
  );

  useEffect(() => {
    if (user?.id && myReservations.length === 0) {
      dispatch(fetchMyReservationsThunk({ userId: user.id, status: "ALL" }));
    }
  }, [user?.id, myReservations.length, dispatch]);

  const displayData = reservationId
    ? myReservations.filter((r) => String(r.id) === String(reservationId))
    : myReservations;

  // PDF 생성 및 저장 함수
  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      // 1. HTML 영역을 Canvas로 변환 (scale을 높여 화질 개선)
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // 2. PDF 설정 (A4 기준)
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // 3. 이미지 삽입 및 저장
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save(`reservation_receipt_${reservationId || "list"}.pdf`);
    } catch (error) {
      console.error("PDF 생성 중 오류 발생:", error);
      alert("PDF를 생성하는 데 실패했습니다.");
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
      {/* 상단 버튼 영역 (PDF 포함 안 됨) */}
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

      {/* PDF로 캡처될 영역 시작 */}
      <div className="MyReservationTable-print-area" ref={printRef}>
        <div className="MyReservationTable-div-wrapper">
          <div className="MyReservationTable-div-header">
            <div className="MyReservationTable-div-th">방문 일시</div>
            <div className="MyReservationTable-div-th">서비스 및 담당자</div>
            <div className="MyReservationTable-div-th">엔지니어 정보</div>
            <div className="MyReservationTable-div-th">진행 상태</div>
            <div className="MyReservationTable-div-th">결제 예정액</div>
          </div>

          {apiStatus === "loading" ? (
            <div className="MyReservationTable-div-message">
              데이터 로딩 중...
            </div>
          ) : displayData.length > 0 ? (
            displayData.map((res) => {
              const statusInfo = getStatusDisplay(res.status);
              const policy = SERVICE_POLICY_MAP[res.servicePolicyId];

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
                        {policy?.name || "점검 항목 확인"}
                      </p>
                      <div className="sub-info-row">
                        <span>담당자: {user?.name}님</span>
                        <span className="divider">|</span>
                        <span>매장 No.{res.businessId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="MyReservationTable-div-td engineer-cell">
                    <div className="cell-content">
                      {res.engineerName ? (
                        <div className="engineer-info-card">
                          <strong className="main-text">
                            {res.engineerName} 기사님
                          </strong>
                          <p className="sub-text">{res.engineerPhone}</p>
                        </div>
                      ) : (
                        <span className="waiting-text">배정 진행 중</span>
                      )}
                    </div>
                  </div>

                  <div className="MyReservationTable-div-td status-cell">
                    <span
                      className={`MyReservationTable-span-badge ${statusInfo.class}`}
                    >
                      {statusInfo.text}
                    </span>
                  </div>

                  <div className="MyReservationTable-div-td payment-cell">
                    <div className="cell-content">
                      <strong className="price-text">
                        {policy ? `${policy.price.toLocaleString()}원` : "0원"}
                      </strong>
                      <p className="sub-text">현장 결제</p>
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

        {/* PDF 저장 시에만 의미 있는 하단 문구 */}
        <div
          className="print-only-footer"
          style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "#999",
            textAlign: "center",
          }}
        >
          본 서류는 예약 확인용 영수증이며, 실제 결제는 현장에서 이루어집니다.
        </div>
      </div>
    </div>
  );
};

export default MyReservationTablePage;
