import React from 'react';
import './styles.css';

function ContainerButtons({ handleNextQuestion, handleShowQuestion, handleStartTimer }) {
    return (
      <div className="row-main_buttons">
        <button onClick={() => handleNextQuestion()}>Mostrar resposta</button>
        <button onClick={() => handleNextQuestion()}>Próxima pergunta</button>
      </div>
    )
}

export default ContainerButtons;