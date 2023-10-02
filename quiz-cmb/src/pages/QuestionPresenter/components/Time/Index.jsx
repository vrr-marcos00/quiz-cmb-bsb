import React from "react";
import "./styles.css";

function Time({ currentLevel, timer }) {
  const getLevel = {
    easy: "Fácil",
    medium: "Médio",
    difficult: "Difícil",
  };
  return (
    // <div className="time">
    //   <div className="total-time">15:00</div>
    //   <div className="question-time">30</div>
    // </div>

    <div className="level">
      <div className="current-level">{String(timer)}</div>
    </div>
  );
}

export default Time;
