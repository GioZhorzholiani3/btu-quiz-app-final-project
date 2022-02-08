import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";

const Home = () => {
  const attempts = JSON.parse(localStorage.getItem("attempts")) || [];
  console.log(attempts);
  const isLast = attempts.sort((a, b) => (a.compDate > b.compDate ? -1 : 1));
  console.log(isLast);

  useEffect(() => {
    anime({
      targets: ".start button",
      translateX: 0,
      opacity: 1,
      delay: 500,
      easing: "easeInOutQuad",
    });
    anime({
      targets: ".name",
      translateY: -30,
      direction: "alternate",
      loop: true,
      easing: "easeInOutQuad",
    });
  }, []);

  return (
    <div className="home">
      <div className="start">
        <Link to="/quiz">
          <button className="btn">start quiz</button>
        </Link>
        <Link to="/history">
          <button className="btn">check history</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
