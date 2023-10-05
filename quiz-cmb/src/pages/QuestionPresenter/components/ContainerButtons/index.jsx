import React from "react";
import "./styles.css";

function ContainerButtons({
  handleNextQuestion,
  handleInitTimer,
  isResponsePage,
  isTimerRunning,
}) {
  return (
    <div className="row-main_buttons">
      {isResponsePage ? (
        <button onClick={() => handleNextQuestion()}>Próxima pergunta</button>
      ) : (
        <>
          <button
            className={`${isTimerRunning ? "--disabled" : ""}`}
            disabled={isTimerRunning}
            onClick={() => handleInitTimer()}
          >
            Iniciar tempo
          </button>
        </>
      )}
    </div>
  );
}

export default ContainerButtons;
