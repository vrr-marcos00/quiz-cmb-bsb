import React from "react";
import "./styles.css";

function TimeAndTheme({ theme, isResponsePage, timer, currentLevel }) {
  const mainTitle = isResponsePage ? "Resposta" : theme;

  const getLevelTranslation = {
    easy: "Fácil",
    medium: "Médio",
    difficult: "Difícil",
  };

  const getLevelClass = {
    easy: "easy-level",
    medium: "medium-level",
    difficult: "difficult-level",
  };

  return (
    <div className="time-and-themer-container">
      <p className="total-time">15:00</p>
      <p className="theme-presenter">{mainTitle}</p>
      <p className={`level-presenter ${getLevelClass[currentLevel]}`}>{getLevelTranslation[currentLevel]}</p>
      <p className="question-time">{timer}</p>
    </div>
  );
}

export default TimeAndTheme;
