import React from "react";
import "./styles.css";

function TimeQuestion({ currentLevel, timer }) {
  const getLevel = {
    easy: "Fácil",
    medium: "Médio",
    difficult: "Difícil",
  };

  return (
    // <div className="time-question-student">
    //   <div>30</div>
    // </div>
    <div className="level-student">
      <div className="current-level-student">{timer}</div>
    </div>
  );
}

export default TimeQuestion;
