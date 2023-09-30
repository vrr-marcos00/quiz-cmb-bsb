import React from 'react';
import './styles.css';

function TimeQuestion({ currentLevel }) {
  return (
    // <div className="time-question-student">
    //   <div>30</div>
    // </div>
    <div className="level-student" >
      <div className="current-level-student">{currentLevel}</div>
    </div>
  );
}

export default TimeQuestion;