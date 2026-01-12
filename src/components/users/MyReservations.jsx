import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  fetchMyReservationsThunk,
  cancelReservationThunk,
} from "../../store/thunks/reservationThunk";
import { fetchServicePoliciesThunk } from "../../store/thunks/servicePolicyThunk";
import { getBusinessesThunk } from "../../store/thunks/businessThunk";
import "./MyReservations.css";
import "../common/CommonStyles.css"; // 공통 CSS 임포트
import MyReservationSkeleton from "../common/Skeleton/MyReservationSkeleton.jsx"; // 스켈레톤 추가

const MyReservations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    myReservations,
    status: apiStatus,
    lastReservation,
  } = useSelector((state) => state.reservation);
  const { items: policyItems } = useSelector((state) => state.servicePolicy);
  const { businessesList } = useSelector((state) => state.business);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("CONFIRMED");
  const [flashId, setFlashId] = useState(null);
  const [flashType, setFlashType] = useState("");

  const cardRefs = useRef({});

  const scrollToTarget = (id) => {
    if (cardRefs.current[id]) {
      cardRefs.current[id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(
        fetchMyReservationsThunk({ userId: user.id, status: filterStatus })
      );
      dispatch(fetchServicePoliciesThunk());
      dispatch(getBusinessesThunk());
    }
  }, [user?.id, filterStatus, dispatch]);

  useEffect(() => {
    if (lastReservation?.id) {
      setFlashType("new");
      setFlashId(lastReservation.id);
      setTimeout(() => scrollToTarget(lastReservation.id), 300);
      setTimeout(() => {
        setFlashId(null);
        setFlashType("");
      }, 2000);
    }
  }, [lastReservation]);

  const handleConfirmCancel = async () => {
    if (!selectedReservationId) return;
    try {
      await dispatch(cancelReservationThunk(selectedReservationId)).unwrap();
      setFlashType("cancel");
      setFlashId(selectedReservationId);
      setTimeout(() => {
        dispatch(
          fetchMyReservationsThunk({ userId: user.id, status: filterStatus })
        );
        alert("예약이 성공적으로 취소되었습니다.");
      }, 800);
    } catch (error) {
      alert(error.message || "취소에 실패했습니다.");
    } finally {
      setIsCancelModalOpen(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "CONFIRMED":
        return { label: "예약 확정", class: "status-confirmed" };
      case "COMPLETED":
        return { label: "방문 완료", class: "status-completed" };
      case "CANCELED":
        return { label: "취소됨", class: "status-canceled" };
      default:
        return { label: "대기", class: "status-pending" };
    }
  };

  const checkIsWithin24Hours = (reservedDate, serviceWindow) => {
    const startTime = serviceWindow.split(" ~ ")[0];
    return dayjs(`${reservedDate} ${startTime}`).diff(dayjs(), "hour") < 24;
  };

  // 1. 실제 로딩 중일 때 스켈레톤 반환
  if (apiStatus === "loading" && !flashId) {
    return <MyReservationSkeleton />;
  }

  return (
    <div className="MyReservations-div-container">
      {/* 공통 헤더 및 뒤로가기 버튼 적용 */}
      <div className="common-page-head">
        <p className="MyReservations-p-title">예약 조회 / 취소</p>
        <button className="common-btn-back" onClick={() => navigate("/mypage")}>
          <span>〈</span> 뒤로 가기
        </button>
      </div>

      <div className="MyReservations-div-tabs-wrapper">
        <div className="MyReservations-div-tabs">
          {["CONFIRMED", "COMPLETED", "CANCELED"].map((s) => (
            <button
              key={s}
              className={`MyReservations-button-tab ${
                filterStatus === s ? "active" : ""
              }`}
              onClick={() => setFilterStatus(s)}
            >
              {getStatusInfo(s).label}
            </button>
          ))}
        </div>
        <p className="MyReservations-p-policy-hint">
          * 방문 24시간 전까지만 취소 가능합니다.
        </p>
      </div>

      <div className="MyReservations-div-list">
        {myReservations.length === 0 ? (
          <div className="MyReservations-div-empty-box">
            조회된 예약 내역이 없습니다.
          </div>
        ) : (
          myReservations.map((res) => {
            const isWithin24Hours = checkIsWithin24Hours(
              res.reservedDate,
              res.serviceWindow
            );
            const isCancelable = res.status === "CONFIRMED" && !isWithin24Hours;
            const policy = policyItems.find(
              (p) => String(p.id) === String(res.servicePolicyId)
            );
            const business = businessesList.find(
              (b) => String(b.id) === String(res.businessId)
            );

            return (
              <div
                key={res.id}
                ref={(el) => (cardRefs.current[res.id] = el)}
                className={`MyReservations-div-card ${
                  flashId === res.id
                    ? `MyReservations-effect-flash-${flashType}`
                    : ""
                }`}
              >
                <div className="MyReservations-div-card-top">
                  <span className="MyReservations-span-store-name">
                    {business?.name || "매장 정보 없음"}
                  </span>
                  <span
                    className={`MyReservations-span-status-badge ${res.status.toLowerCase()}`}
                  >
                    {getStatusInfo(res.status).label}
                  </span>
                </div>

                <h3 className="MyReservations-h3-service-title">
                  {policy
                    ? `${policy.serviceType} [${policy.sizeType}]`
                    : "서비스 정보 확인 중"}
                </h3>

                <div className="MyReservations-div-info-section">
                  <div className="MyReservations-div-info-row">
                    <span className="MyReservations-span-label">일정</span>
                    <span className="MyReservations-span-value-date">
                      {res.reservedDate} | {res.serviceWindow}
                    </span>
                  </div>
                  <div className="MyReservations-div-info-row">
                    <span className="MyReservations-span-label">기사</span>
                    <span className="MyReservations-span-value">
                      {res.engineerName || "배정 중"}
                      {res.engineerPhone && ` (${res.engineerPhone})`}
                    </span>
                  </div>
                </div>

                <div className="MyReservations-div-card-actions">
                  <button
                    className={`MyReservations-button-cancel ${
                      !isCancelable ? "disabled" : ""
                    }`}
                    disabled={!isCancelable}
                    onClick={() => {
                      setSelectedReservationId(res.id);
                      setIsCancelModalOpen(true);
                    }}
                  >
                    {res.status === "CANCELED"
                      ? "취소됨"
                      : isWithin24Hours
                      ? "취소 불가"
                      : "취소하기"}
                  </button>
                  <button
                    className="MyReservations-button-detail"
                    onClick={() =>
                      navigate(`/mypage/reservations/table/${res.id}`)
                    }
                  >
                    상세 조회
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isCancelModalOpen && (
        <div className="MyReservations-div-modal-overlay">
          <div className="MyReservations-div-modal-content">
            <p className="MyReservations-p-modal-main-text">
              예약을 취소하시겠습니까?
            </p>
            <p className="MyReservations-p-modal-sub-text">
              취소 후에는 복구가 불가능합니다.
            </p>
            <div className="MyReservations-div-modal-btns">
              <button
                className="MyReservations-button-close"
                onClick={() => setIsCancelModalOpen(false)}
              >
                닫기
              </button>
              <button
                className="MyReservations-button-confirm"
                onClick={handleConfirmCancel}
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

export default MyReservations;
