import React from 'react';
import './styles.css';

function ContainerQuestions({ question }) {
  return (
    <div className="row-main_question">
      <div>
        <div className='question'>
          <div className="cointainer-awnser">
            {question.pergunta && (
              <>
                {question.pergunta.split(/\r?\n/).map((item) => (
                  <p>{item}</p>
                ))}
              </>
            )}
          </div>
          <div className="cointainer-image">
            {question.imgPergunta && (
              <img src={question.imgPergunta} alt="Imagem da pergunta" />
            )}
          </div>
        </div>
        <div className="alternatives">
          {question.alternativas && (
            <>
              {question.alternativas.map((alternatives, index) => (
                <span className="alternatives_span">{alternatives}</span>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContainerQuestions;