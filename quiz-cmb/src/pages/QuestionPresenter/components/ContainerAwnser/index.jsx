import React from "react";
import "./styles.css";

function ContainerAwnser({ question, isResponsePage }) {
  const checkIsResponseDescription = question?.description || question?.question;

  return (
    <div className="container-awnser">
        <div className="awnser">
          {question?.question && (
            <>
              {question?.question?.split(/\r?\n/).map((item, index) => (
                <p key={index}>{isResponsePage ? checkIsResponseDescription : item}</p>
              ))}
            </>
          )}
        </div>
    </div>
  );
}

export default ContainerAwnser;
