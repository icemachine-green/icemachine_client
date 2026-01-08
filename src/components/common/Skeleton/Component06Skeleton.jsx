import React from "react";
import "../Skeleton/Component06Skeleton.css";
import "../Skeleton/Skeleton.css"; // 공통 Shimmer 애니메이션

const Component06Skeleton = () => {
  return (
    <div className="component06-container skeleton-container">
      <div className="component06-title-container">
        <div className="skeleton-item skeleton-shimmer skeleton-c06-title"></div>
        <div className="skeleton-item skeleton-shimmer skeleton-c06-separator"></div>
      </div>

      <div className="component06-btn-container">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="component06-faq-item" key={i}>
            <div className="skeleton-item skeleton-shimmer skeleton-c06-button"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Component06Skeleton;