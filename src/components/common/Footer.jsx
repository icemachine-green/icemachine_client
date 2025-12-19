import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-info">
        <ul>
          <li>대표자: 김정배</li>
          <li>사업자등록번호: 504-85-25999</li>
          <li>주소: 대구광역시 중구 중앙대로 394, 호태빌딩 2F</li>
        </ul>
      </div>
      <div className="footer-logo">
        <img src="/icons/textonly_clear.png" alt="Company Logo" />
      </div>
    </footer>
  );
}
