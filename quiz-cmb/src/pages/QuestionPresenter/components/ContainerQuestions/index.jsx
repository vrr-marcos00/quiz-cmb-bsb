import React from "react";
import "./styles.css";

function ContainerQuestions({ question, isResponsePage }) {
  const alternativesLetter = ["A", "B", "C", "D", "E"];
  const checkIsResponseDescription = question?.description || question?.question;

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
    <div className="row-main_question">
      <div>
        <div className="question">
          <div className="cointainer-awnser">
            {question?.question && (
              <>
                {question?.question?.split(/\r?\n/).map((item, index) => (
                  <p key={index}>{isResponsePage ? checkIsResponseDescription : item}</p>
                ))}
              </>
            )}
          </div>
          <div className="cointainer-image">
            {(question?.img_response || question?.img_question) && (
              <img
                src={isResponsePage ? question?.img_response : question?.img_question}
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
                <span className="alternatives_span" id={`alternative-${id}`} key={id}>
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
