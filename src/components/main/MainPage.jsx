import React from "react";
import "./MainPage.css";
import Component01 from "../component01/Component01.jsx";
import Component02 from "../component02/Component02.jsx";
import Component03 from "../component03/Component03.jsx";
import Component04 from "../component04/Component04.jsx";
import Component05 from "../component05/Component05.jsx";
import Component06 from "../component06/Component06.jsx";
import Component07 from "../component07/component07.jsx";

const MainPage = () => {
  return (
    <>
      <div className="mainpage-container">
        <h1>메인 페이지</h1>
      </div>
      <Component01 />
      <Component02 />
      <Component03 />
      <Component04 />
      <Component05 />
      <Component06 />
      <Component07 />
    </>
  );
};

export default MainPage;
