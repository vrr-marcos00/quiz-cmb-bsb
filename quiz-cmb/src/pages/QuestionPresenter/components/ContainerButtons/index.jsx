import React from 'react';
import './styles.css';

function ContainerButtons({ handleNextQuestion, handleShowQuestion, isResponsePage }) {
  return (
    <div className="row-main_buttons">
      {isResponsePage ? (
        <button onClick={() => handleNextQuestion()}>Próxima pergunta</button>
      ) : (
        <button onClick={() => handleShowQuestion()}>Mostrar resposta</button>
      )}
    </div>
  )
}

export default ContainerButtons;