import React from "react";
import "./styles.css";

function CardAlternatives({ alternatives, onClickButton }) {
  return (
    <div className="main-card-alternatives">
      {alternatives && (
        <div className="card-alternatives_buttons">
          {alternatives.map(({ content, id }, index) => (
            <button id={`button-${id}`} onClick={(e) => onClickButton(e, id)}>
              {content}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardAlternatives;
