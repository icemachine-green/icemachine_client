import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyReservationsThunk,
  cancelReservationThunk,
} from "../../store/thunks/reservationThunk";
import "./MyReservations.css";

const MyReservationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 리덕스 상태 가져오기
  const { user } = useSelector((state) => state.auth);
  const { myReservations, status: apiStatus } = useSelector(
    (state) => state.reservation
  );

  // 로컬 상태 관리
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL"); // 필터링용

  // 컴포넌트 마운트 시 및 필터 변경 시 데이터 호출
  useEffect(() => {
    if (user?.id) {
      dispatch(
        fetchMyReservationsThunk({ userId: user.id, status: filterStatus })
      );
    }
  }, [user?.id, filterStatus, dispatch]);

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

  // 실제 취소 요청 연동
  const handleConfirmCancel = async () => {
    if (!selectedReservationId) return;

    try {
      // unwrap()을 사용해야 thunk의 에러(24시간 전 등)를 catch에서 잡을 수 있습니다.
      await dispatch(cancelReservationThunk(selectedReservationId)).unwrap();
      alert("예약이 성공적으로 취소되었습니다.");
    } catch (error) {
      // 서버에서 보낸 에러 메시지 (Error: 서비스 시작 24시간 전...) 출력
      alert(error.message || "취소에 실패했습니다. 고객센터에 문의하세요.");
    } finally {
      closeCancelModal();
    }
  };

  // 상태값에 따른 라벨 및 스타일 클래스 반환
  const getStatusInfo = (status) => {
    switch (status) {
      case "CONFIRMED":
        return { label: "예약 확정", class: "status-confirmed" };
      case "COMPLETED":
        return { label: "방문 완료", class: "status-completed" };
      case "CANCELED":
        return { label: "취소됨", class: "status-canceled" };
      case "START":
        return { label: "서비스중", class: "status-start" };
      default:
        return { label: "대기", class: "status-pending" };
    }
  };

  return (
    <div className="MyReservationPage-div-container">
      {/* 헤더 */}
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

      {/* 상태 필터 탭 (추가) */}
      <div className="MyReservationPage-div-tabs">
        {["ALL", "CONFIRMED", "COMPLETED", "CANCELED"].map((s) => (
          <button
            key={s}
            className={`MyReservationPage-button-tab ${
              filterStatus === s ? "active" : ""
            }`}
            onClick={() => setFilterStatus(s)}
          >
            {s === "ALL" ? "전체" : getStatusInfo(s).label}
          </button>
        ))}
      </div>

      {/* 예약 리스트 */}
      <div className="MyReservationPage-div-list">
        {apiStatus === "loading" ? (
          <p className="MyReservationPage-p-loading">
            데이터를 불러오는 중입니다...
          </p>
        ) : myReservations.length === 0 ? (
          <p className="MyReservationPage-p-empty">
            조회된 예약 내역이 없습니다.
          </p>
        ) : (
          myReservations.map((res) => {
            const statusInfo = getStatusInfo(res.status);
            const isCancelable =
              res.status === "CONFIRMED" || res.status === "PENDING";

            return (
              <div
                key={res.id}
                className={`MyReservationPage-div-card ${res.status.toLowerCase()}`}
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
                    기사: {res.engineerName || "배정 중"}{" "}
                    {res.engineerPhone && `(${res.engineerPhone})`}
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
                    {res.status === "CANCELED" ? "취소됨" : "취소하기"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 모달 생략 (동일한 네이밍 규칙 적용) */}
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
