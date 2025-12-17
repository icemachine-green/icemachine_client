import React from "react";
import "./MainPage.css";
import Component01 from "../component01/Component01.jsx";
import Component02 from '../component02/Component02.jsx';

const MainPage = () => {
  return (
    <>
      <div className="mainpage-container">
        <h1>메인 페이지</h1>
      </div>
      <Component01 />
      <Component02 />
    </>
  );
};

export default MainPage;

