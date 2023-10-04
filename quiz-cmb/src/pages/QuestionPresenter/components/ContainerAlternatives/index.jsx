import React from "react";
import "./styles.css";

function ContainerAlternatives({ className, question, isResponsePage }) {
  const alternativesLetter = ["A", "B", "C", "D", "E"];

  React.useEffect(() => {
    const alternativeCorrect = document.getElementById(`alternative-${question.correct_answer_id}`);

    if (isResponsePage) {
      if (alternativeCorrect) {
        alternativeCorrect.style.backgroundColor = "#0F0";
      }
    } else {
      if (alternativeCorrect) {
        alternativeCorrect.style.backgroundColor = "#fff";
      }
    }
  }, [isResponsePage, question.correct_answer_id]);

  return (
    <div className="row-main_alternatives" style={{ ...className }}>
      <div className="alternatives">
        {question?.alternatives && (
          <>
            {question?.alternatives.map(({ content, id }, index) => (
              <span className="alternatives_span" id={`alternative-${id}`} key={id}>
                {`${alternativesLetter[index]}) ${content}`}
              </span>
            ))}
          </>
        )}
      </div>

      <div className="alternatives-img">
        {(!isResponsePage) ? (
          <>
            {question?.img_question && (
              <img
                src={question?.img_question}
                alt="Imagem da pergunta"
                loading="lazy"
              />
            )}
          </>

        ) : (
          <>
            {question?.img_response && (
              <img
                src={question?.img_response}
                alt="Imagem da pergunta"
                loading="lazy"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ContainerAlternatives;
