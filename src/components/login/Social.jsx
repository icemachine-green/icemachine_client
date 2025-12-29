import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reissueThunk } from "../../store/thunks/authThunk.js";

export default function Social() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAuth() {
      try {
        const result = await dispatch(reissueThunk());
        if (result.type.endsWith("/rejected")) {
          console.log(result);
          throw new Error();
        }
        console.log("social jsx", result);
        navigate("/", { replace: true });
      } catch (error) {
        console.log("Social", error);
        alert("소셜 로그인 실패");
        navigate("/login", { replace: true });
      }
    }
    getAuth();
  }, []);

  // 로딩 중이거나 아직 상태 결정이 안됐을 때는 아무것도 보여주지 않음
  return <></>;
}
