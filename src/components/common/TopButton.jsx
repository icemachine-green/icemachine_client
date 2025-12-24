import React from "react";
import "./TopButton.css";

const TopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button className="top-button" onClick={scrollToTop}>
      <img src="/icons/topbutton.png" alt="Top" />
    </button>
  );
};

export default TopButton;