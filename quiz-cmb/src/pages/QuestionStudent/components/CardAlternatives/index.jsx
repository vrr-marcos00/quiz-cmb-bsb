import React from "react";
import "./styles.css";

function CardAlternatives({ alternatives, onClickButton }) {
  const alternativesLetter = ["A", "B", "C", "D", "E"];

  return (
    <div className="main-card-alternatives">
      {alternatives && (
        <div className="card-alternatives_buttons">
          {alternatives.map(({ content, id }, index) => (
            <button id={`button-${id}`} key={`button-${id}`} onClick={(e) => onClickButton(e, id)}>
              {`${alternativesLetter[index]}) ${content}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardAlternatives;
