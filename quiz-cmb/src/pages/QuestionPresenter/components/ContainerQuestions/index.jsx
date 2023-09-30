import React from "react";
import "./styles.css";

function ContainerQuestions({ question }) {
  const alternativesLetter = ["A", "B", "C", "D", "E"];

  return (
    <div className="row-main_question">
      <div>
        <div className="question">
          <div className="cointainer-awnser">
            {question?.question && (
              <>
                {question?.question?.split(/\r?\n/).map((item, index) => (
                  <p>{item}</p>
                ))}
              </>
            )}
          </div>
          <div className="cointainer-image">
            {question?.img_response && (
              <img
                src={question?.img_response}
                alt="Imagem da pergunta"
                loading="lazy"
              />
            )}
          </div>
        </div>
        <div className="alternatives">
          {question?.alternatives && (
            <>
              {question?.alternatives.map(({ content, id }, index) => (
                <span className="alternatives_span" key={id}>
                  {`${alternativesLetter[index]}) ${content}`}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContainerQuestions;
