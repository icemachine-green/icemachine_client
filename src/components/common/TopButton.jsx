import React from "react";
import "./TopButton.css";
import topIcon from "../../../public/icons/topbutton.png";

const TopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button className="top-button" onClick={scrollToTop}>
      <img src={topIcon} alt="Top" />
    </button>
  );
};

export default TopButton;