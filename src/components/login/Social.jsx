import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Social() {
  const navigate = useNavigate();
  const { status, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    // reissueThunk의 상태가 변경되기를 기다림
    if (status === "succeeded" && isLoggedIn) {
      navigate("/posts", { replace: true });
    } else if (status === "failed") {
      alert("소셜 로그인에 실패했습니다. 다시 시도해 주세요.");
      navigate("/login", { replace:true });
    }
  }, [status, isLoggedIn, navigate]);

  // 로딩 중이거나 아직 상태 결정이 안됐을 때는 아무것도 보여주지 않음
  return <></>;
}
