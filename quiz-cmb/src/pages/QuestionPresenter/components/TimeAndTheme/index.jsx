import React from 'react';
import './styles.css';

function TimeAndTheme({ theme, isResponsePage }) {
  const mainTitle = isResponsePage ? 'Resposta' : theme;

  return (
    <div className="time-and-themer-container" >
      <div className="total-time">15:00</div>
      <div className="theme-presenter">{mainTitle}</div>
      <div className="question-time">30</div>
    </div>

  )
}

export default TimeAndTheme;