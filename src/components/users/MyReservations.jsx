import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { fetchMyReservationsThunk, cancelReservationThunk, } from "../../store/thunks/reservationThunk";
import "./MyReservations.css";
import MyReservationSkeleton from "../common/Skeleton/MyReservationSkeleton.jsx"; // 스켈레톤 추가

const MyReservationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    myReservations,
    status: apiStatus,
    lastReservation,
  } = useSelector((state) => state.reservation);

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
    }
  }, [user?.id, filterStatus, dispatch]);

  useEffect(() => {
    if (lastReservation?.id) {
      setFlashType("new");
      setFlashId(lastReservation.id);

      const scrollTimer = setTimeout(() => {
        scrollToTarget(lastReservation.id);
      }, 300);

      const flashTimer = setTimeout(() => {
        setFlashId(null);
        setFlashType("");
      }, 2000);

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(flashTimer);
      };
    }
  }, [lastReservation]);

  const redirectMyPage = () => navigate("/mypage");
  const redirectReservationTable = (id) =>
    navigate(`/mypage/reservations/table/${id}`);

  const openCancelModal = (id) => {
    setSelectedReservationId(id);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setSelectedReservationId(null);
    setIsCancelModalOpen(false);
  };

  const handleConfirmCancel = async () => {
    if (!selectedReservationId) return;
    try {
      await dispatch(cancelReservationThunk(selectedReservationId)).unwrap();

      setFlashType("cancel");
      setFlashId(selectedReservationId);
      scrollToTarget(selectedReservationId);

      setTimeout(() => {
        setFlashId(null);
        setFlashType("");
        dispatch(
          fetchMyReservationsThunk({ userId: user.id, status: filterStatus })
        );
        alert("예약이 성공적으로 취소되었습니다.");
      }, 800);
    } catch (error) {
      alert(error.message || "취소에 실패했습니다.");
    } finally {
      closeCancelModal();
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
      case "START":
        return { label: "서비스 중", class: "status-start" };
      default:
        return { label: "대기", class: "status-pending" };
    }
  };

  const checkIsWithin24Hours = (reservedDate, serviceWindow) => {
    const startTime = serviceWindow.split(" ~ ")[0];
    const startDateTime = dayjs(`${reservedDate} ${startTime}`);
    const now = dayjs();
    return startDateTime.diff(now, "hour") < 24;
  };

  // 1. 실제 로딩 중일 때 스켈레톤 반환
  if (apiStatus === "loading" && !flashId) {
    return <MyReservationSkeleton />;
  }

  return (
    <div className="MyReservationPage-div-container">
      <div className="MyReservationPage-div-head">
        <button
          className="MyReservationPage-button-back"
          onClick={redirectMyPage}
        >
          뒤로 가기
        </button>
        <p className="MyReservationPage-p-title">예약 조회 / 취소</p>
      </div>

      <hr className="MyReservationPage-hr-underline" />

      <div className="MyReservationPage-div-tabs-wrapper">
        <div className="MyReservationPage-div-tabs">
          {["CONFIRMED", "COMPLETED", "CANCELED"].map((s) => (
            <button
              key={s}
              className={`MyReservationPage-button-tab ${
                filterStatus === s ? "active" : ""
              }`}
              onClick={() => setFilterStatus(s)}
            >
              {getStatusInfo(s).label}
            </button>
          ))}
        </div>
        <span className="MyReservationPage-span-policy-hint">
          *예약 방문 시간 기준 24시간 전까지만 취소 가능합니다.
        </span>
      </div>

      <div className="MyReservationPage-div-list">
        {myReservations.length === 0 ? (
          <p className="MyReservationPage-p-empty">
            조회된 예약 내역이 없습니다.
          </p>
        ) : (
          myReservations
            .slice()
            .sort((a, b) => {
              const timeA = new Date(
                `${a.reservedDate} ${a.serviceWindow.split(" ~ ")[0]}`
              );
              const timeB = new Date(
                `${b.reservedDate} ${b.serviceWindow.split(" ~ ")[0]}`
              );
              return timeA - timeB;
            })
            .map((res) => {
              const statusInfo = getStatusInfo(res.status);
              const isWithin24Hours = checkIsWithin24Hours(
                res.reservedDate,
                res.serviceWindow
              );
              const isCancelable =
                (res.status === "CONFIRMED" || res.status === "PENDING") &&
                !isWithin24Hours;
              const isFlash = flashId === res.id;

              return (
                <div
                  key={res.id}
                  ref={(el) => (cardRefs.current[res.id] = el)}
                  className={`MyReservationPage-div-card ${res.status.toLowerCase()} ${
                    isFlash ? `effect-flash-${flashType}` : ""
                  }`}
                >
                  <div className="MyReservationPage-div-card-info">
                    <span
                      className={`MyReservationPage-span-status ${statusInfo.class}`}
                    >
                      {statusInfo.label}
                    </span>
                    <p className="MyReservationPage-p-date">
                      {res.reservedDate} | {res.serviceWindow}
                    </p>
                    <p className="MyReservationPage-p-engineer">
                      기사: {res.engineerName || "배정 중"}
                      {res.engineerPhone && ` (${res.engineerPhone})`}
                    </p>
                  </div>

                  <div className="MyReservationPage-div-card-actions">
                    <button
                      className="MyReservationPage-button-view"
                      onClick={() => redirectReservationTable(res.id)}
                    >
                      상세 조회
                    </button>
                    <button
                      className={`MyReservationPage-button-cancel ${
                        !isCancelable ? "disabled" : ""
                      }`}
                      onClick={() => isCancelable && openCancelModal(res.id)}
                      disabled={!isCancelable}
                    >
                      {res.status === "CANCELED"
                        ? "취소됨"
                        : isWithin24Hours &&
                          (res.status === "CONFIRMED" ||
                            res.status === "PENDING")
                        ? "취소불가"
                        : "취소하기"}
                    </button>
                  </div>
                </div>
              );
            })
        )}
      </div>

      {isCancelModalOpen && (
        <div className="MyReservationPage-div-modal-overlay">
          <div className="MyReservationPage-div-modal">
            <div className="MyReservationPage-div-modal-header">알림</div>
            <div className="MyReservationPage-div-modal-body">
              <p>정말 예약을 취소하시겠습니까?</p>
              <span className="MyReservationPage-span-notice">
                ※ 방문 24시간 전까지만 가능합니다.
              </span>
            </div>
            <div className="MyReservationPage-div-modal-footer">
              <button
                className="MyReservationPage-button-modal-confirm"
                onClick={handleConfirmCancel}
              >
                확인
              </button>
              <button
                className="MyReservationPage-button-modal-close"
                onClick={closeCancelModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReservationPage;
