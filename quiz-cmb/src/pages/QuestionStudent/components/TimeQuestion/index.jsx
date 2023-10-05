import React from "react";
import "./styles.css";

function TimeQuestion({ currentLevel, timer }) {
  const getLevel = {
    easy: "level-easy",
    medium: "level-medium",
    difficult: "level-difficult",
  };

  return (
    <div className={`level-student ${getLevel[currentLevel]}`}>
      <div className="current-level-student">{timer}</div>
    </div>
  );
}

export default TimeQuestion;
