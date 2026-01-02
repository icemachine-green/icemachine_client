import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusinessDetailThunk,
  deleteBusinessThunk,
} from "../../store/thunks/businessThunk";
import {
  getIcemachinesByBusinessIdThunk,
  createIcemachineThunk,
  deleteIcemachineThunk,
} from "../../store/thunks/icemachineThunk";
import MyStoreEditModal from "./MyStoreEditModal";
import MyStoreAddIcemachineModal from "./MyStoreAddIcemachineModal";
import "./MyStoreDetail.css";

const MyStoreDetail = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddIcemachineModal, setShowAddIcemachineModal] = useState(false);

  // Redux 스토어에서 매장 상세 정보 관련 상태를 가져옵니다.
  const { businessDetail, detailStatus, detailError } = useSelector(
    (state) => state.business
  );
  // Redux 스토어에서 제빙기 관련 상태를 가져옵니다.
  const {
    icemachinesList,
    listStatus: icemachineListStatus,
    listError: icemachineListError,
  } = useSelector((state) => state.icemachine);

  useEffect(() => {
    if (businessId) {
      dispatch(getBusinessDetailThunk(businessId));
      dispatch(getIcemachinesByBusinessIdThunk(businessId)); // 제빙기 목록 별도 호출
    }
  }, [businessId, dispatch]);

  const redirectMyStores = () => navigate("/mypage/stores");

  const handleDeleteBusiness = async () => {
    if (window.confirm("정말로 이 매장을 삭제하시겠습니까?")) {
      await dispatch(deleteBusinessThunk(businessId));
      // 삭제 성공 여부와 관계없이 목록 페이지로 이동
      navigate("/mypage/stores");
    }
  };

  const handleDeleteIcemachine = async (icemachineId) => {
    if (window.confirm("정말로 이 제빙기를 삭제하시겠습니까?")) {
      await dispatch(deleteIcemachineThunk(icemachineId));
      // 삭제 후 제빙기 목록이 자동으로 업데이트되므로 추가적인 navigate 불필요
    }
  };

  // 로딩 중이거나 에러 발생 시 UI
  if (detailStatus === "loading" || icemachineListStatus === "loading") {
    return (
      <div className="my-store-detail-container">
        <div>로딩 중...</div>
      </div>
    );
  }
  if (detailError) {
    return (
      <div className="my-store-detail-container">
        <div>
          매장 상세 정보를 불러오는 데 실패했습니다:{" "}
          {detailError.message || "알 수 없는 오류"}
        </div>
      </div>
    );
  }
  if (icemachineListError) {
    return (
      <div className="my-store-detail-container">
        <div>
          제빙기 목록을 불러오는 데 실패했습니다:{" "}
          {icemachineListError.message || "알 수 없는 오류"}
        </div>
      </div>
    );
  }

  // 매장 정보가 없을 경우
  if (!businessDetail && detailStatus === "succeeded") {
    return (
      <div className="my-store-detail-container">
        <div>매장 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="my-store-detail-container">
      {/* 헤더 */}
      <div className="my-store-detail-head">
        <button className="my-store-detail-back-btn" onClick={redirectMyStores}>
          뒤로 가기
        </button>
        <p className="my-store-detail-head-title">매장 상세 정보</p>
      </div>

      {/* 가로선 */}
      <hr className="my-store-detail-underline" />

      {/* 매장 정보 표시 */}
            <div className="my-store-detail-content">
                {businessDetail && (
                    <>
                        {/* '매장 정보 수정' button positioned here */}
                        <button
                            className="my-store-detail-edit-btn-in-box"
                            onClick={() => setShowEditModal(true)}
                        >
                            매장 정보 수정
                        </button>

                        <h3>{businessDetail.name}</h3>
                        <p><strong>매장 ID:</strong> {businessDetail.id}</p>
                        <p><strong>주소:</strong> {businessDetail.mainAddress} {businessDetail.detailedAddress}</p>
                        <p><strong>매장 연락처:</strong> {businessDetail.phoneNumber}</p>
                        <p><strong>담당자:</strong> {businessDetail.managerName}</p>

                        {/* 제빙기 섹션 헤더와 '제빙기 추가' 버튼 */}
                        <div className="icemachine-list-header">
                            <h4>제빙기 정보:</h4>
                            <button
                                className="my-store-detail-add-icemachine-btn-in-header"
                                onClick={() => setShowAddIcemachineModal(true)}
                            >
                                제빙기 추가
                            </button>
                        </div>
                        {icemachinesList && icemachinesList.length > 0 ? (
                            icemachinesList.map((machine) => (
                                <div key={machine.id} className="icemachine-detail-item">
                                    <div className="icemachine-info">
                                        <p><strong>제빙기 ID:</strong> {machine.id}</p>
                                        <p><strong>모델명:</strong> {machine.modelName}</p>
                                        <p><strong>모델 종류:</strong> {machine.modelType}</p>
                                        <p><strong>사이즈 종류:</strong> {machine.sizeType}</p>
                                        <p><strong>등록일:</strong> {new Date(machine.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="icemachine-actions-per-item">
                                        <button
                                            className="my-store-detail-delete-icemachine-btn"
                                            onClick={() => handleDeleteIcemachine(machine.id)}
                                        >
                                            제빙기 삭제
                                        </button>
                                        <button
                                            className="my-store-detail-edit-icemachine-btn"
                                            // onClick={() => handleEditIcemachine(machine.id)} // Implement later
                                        >
                                            제빙기 수정
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>등록된 제빙기가 없습니다.</p>
                        )}
                    </>
                )}
            </div>

            {/* 하단 기능 버튼들 (매장 삭제, 예약 하기) */}
            <div className="my-store-detail-bottom-actions">
                <button
                    className="my-store-detail-delete-btn-bottom"
                    onClick={handleDeleteBusiness}
                >
                    매장 삭제
                </button>
                <button
                    className="my-store-detail-reserve-btn-bottom"
                    onClick={() => navigate('/reservation')} // Redirect to reservation page
                >
                    예약 하기
                </button>
            </div>

      {showEditModal && businessDetail && (
        <MyStoreEditModal
          business={businessDetail}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showAddIcemachineModal && businessDetail && (
        <MyStoreAddIcemachineModal
          businessId={businessDetail.id}
          onClose={() => setShowAddIcemachineModal(false)}
        />
      )}
    </div>
  );
};

export default MyStoreDetail;
