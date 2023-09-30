import React from 'react';
import './styles.css';

function Time({ currentLevel }) {
  const getLevel = {
    easy: "Fácil",
    medium: "Médio",
    hard: "Difícil"
  }
    return (
    // <div className="time">
    //   <div className="total-time">15:00</div>
    //   <div className="question-time">30</div>
    // </div>

    <div className="level" >
      <div className="current-level">{getLevel[currentLevel]}</div>
    </div>

    )
}

export default Time;