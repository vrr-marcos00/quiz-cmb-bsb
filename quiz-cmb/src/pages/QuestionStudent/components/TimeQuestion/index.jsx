import React from 'react';
import './styles.css';






function TimeQuestion({ currentLevel }) {
  let currentLevelPT = "fácil";
  currentLevel === "medium" ? currentLevelPT = "média" : currentLevelPT = "difícil";

  return (
    // <div className="time-question-student">
    //   <div>30</div>
    // </div>
    <div className="level-student" >
      <div className="current-level-student">{currentLevelPT}</div>
    </div>
  );
}

export default TimeQuestion;