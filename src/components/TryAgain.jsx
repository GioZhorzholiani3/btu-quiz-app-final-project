import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
const TryAgain = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef();

  const popup = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const saveAttempt = () => {
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      month: "long",
      day: "numeric",
    };
    const db = {
      value: props.value,
      maxValue: props.max,
      compDate: now.getTime(),
      date: now.toLocaleDateString(undefined, options),
    };
    const attempts = JSON.parse(localStorage.getItem("attempts")) || [];
    attempts.push(db);
    attempts.sort((a, b) =>
      a.value > b.value
        ? -1
        : a.value === b.value
        ? a.compDate > b.compDate
          ? -1
          : 1
        : 1
    );
    localStorage.setItem("attempts", JSON.stringify(attempts));
  };
  useEffect(() => {
    const hidePopup = (e) => {
      if (!popupRef.current?.contains(e.target)) setIsOpen(false);
    };
    window.addEventListener("click", hidePopup);

    return () => {
      window.removeEventListener("click", hidePopup);
    };
  });
  return (
    <div className="try-container">
      <button className="btn" onClick={popup}>
        try again
      </button>
      <Link to="/history">
        <button className="btn" onClick={saveAttempt}>
          history
        </button>
      </Link>
      <div className={isOpen ? "background" : ""}></div>
      {isOpen && (
        <div className="popup-container" ref={popupRef}>
          <h3 className="popup-text">Do you want to save this attempt?</h3>
          <div className="popup-btn">
            <Link to="/">
              <button className="btn" onClick={saveAttempt}>
                yes
              </button>
            </Link>
            <Link to="/">
              <button className="btn">no</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TryAgain;
