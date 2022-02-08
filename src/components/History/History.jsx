import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContextItem from "../Context/ContextItem";
import anime from "animejs/lib/anime.es.js";
const History = () => {
  const [attemptsArray, setAttemptsArray] = useState([]);

  const delAttempt = (idx) => {
    let newArr = [...attemptsArray];
    newArr = newArr.filter((_, index) => index !== idx);
    setAttemptsArray(newArr);
    localStorage.setItem("attempts", JSON.stringify(newArr));
  };

  useEffect(() => {
    const attempts = JSON.parse(localStorage.getItem("attempts")) || [];
    setAttemptsArray(attempts);
    anime({
      targets: ".history-container",
      opacity: 1,
      delay: 500,
      easing: "easeInOutQuad",
    });
  }, []);

  return (
    <div className="history-container">
      {attemptsArray.length ? (
        <ol className="history">
          {attemptsArray.map((attempt, idx) => {
            return (
              <ContextItem
                key={idx}
                idx={idx}
                value={attempt.value}
                maxValue={attempt.maxValue}
                date={attempt.date}
                del={delAttempt}
              />
            );
          })}
        </ol>
      ) : (
        <div className="history">
          <p className="txt">there is not history</p>
        </div>
      )}

      <Link to="/">
        <button className="btn">Home</button>
      </Link>
    </div>
  );
};

export default History;
