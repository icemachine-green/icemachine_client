import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { socialSignupThunk } from "../../store/thunks/authThunk.js";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber.js"
import "./SignUpPage.css";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // store에서는 로딩 상태와 에러만 가져옴
  const { loading, error } = useSelector((state) => state.auth);

  // URL 파라미터에서 소셜 정보 직접 읽기
  const provider = searchParams.get("provider");
  const socialId = searchParams.get("socialId");

  // 사용자 입력값. URL 파라미터에서 값을 가져와 초기 상태를 설정 (lazy initializer)
  const [form, setForm] = useState(() => ({
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phoneNumber: "",
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

    // 전화번호: 숫자만, 최대 11자리
    if (name === "phoneNumber") {
      nextValue = value.replace(/\D/g, "").slice(0, 11);
    }

    // 이메일: 허용 문자만
    if (name === "email") {
      nextValue = value.replace(/[^A-Za-z0-9@._%+-]/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      phoneNumber: formatPhoneNumber(form.phoneNumber),
      provider,
      socialId,
    };

    const result = await dispatch(
      socialSignupThunk(payload)
    );

    // 회원가입 성공 시 매장 등록페이지로 리디렉션
    if (result.type.endsWith("fulfilled")) {
      navigate("http://localhost:5173/mypage/stores");
    }
  };

  return (
    <div className="signUpPage">
      <div className="signUpPage__container">
        <h2 className="signUpPage__title">회원가입</h2>

        <form className="signUpPage__form" onSubmit={handleSubmit}>
          <div className="signUpPage__field">
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signUpPage__field">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signUpPage__field">
            <label>전화번호</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="숫자만 입력 (예: 01012345678)"
              required
            />
          </div>

          {error && error.msg && (
            <p className="signUpPage__error">{error.msg}</p>
          )}

          <button
            type="submit"
            className="signUpPage__submit"
            disabled={loading}
          >
            {loading ? "처리 중..." : "회원가입 완료"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
