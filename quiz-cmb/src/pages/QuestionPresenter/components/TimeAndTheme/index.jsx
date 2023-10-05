import React from "react";
import "./styles.css";

import { msToMinuteAndSecond } from "../../../../utils/msToMinuteAndSecond";

function TimeAndTheme({
  theme,
  isResponsePage,
  timer,
  currentLevel,
  phaseTimer,
}) {
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
      <p className="total-time">{msToMinuteAndSecond(phaseTimer)}</p>
      <p className="theme-presenter">{mainTitle}</p>
      <p className={`level-presenter ${getLevelClass[currentLevel]}`}>
        {getLevelTranslation[currentLevel]}
      </p>
      <p className="question-time">{timer}</p>
    </div>
  );
}

export default TimeAndTheme;
