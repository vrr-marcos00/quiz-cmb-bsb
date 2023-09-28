import React from 'react';
import './styles.css';

function CardAlternatives({ alternatives, onClickButton }) {
  return (
    <div className="main-card-alternatives">
      {alternatives && (
        <div className="card-alternatives_buttons">
        {alternatives.map((alternative, index) => (
          <button id={`button-${index}`} onClick={(e) => onClickButton(e)}>{alternative}</button>
        ))}
        </ div>
      )}
    </div>
  );
}

export default CardAlternatives;