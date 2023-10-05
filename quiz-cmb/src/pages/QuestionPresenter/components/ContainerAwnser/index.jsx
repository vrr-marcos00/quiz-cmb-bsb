import React from "react";
import "./styles.css";

/**
 * Utils
 */
import { interpretStringWithHTMLTag, containsHTMLTags } from "../../../../utils/interpretStringWithHTMLTag";


function ContainerAwnser({ question, isResponsePage }) {
  const checkIsResponseDescription = isResponsePage ? question?.description : question?.question;
  
  const hasHTMLTags = containsHTMLTags(checkIsResponseDescription);
  const interpretedAwnser = hasHTMLTags ? interpretStringWithHTMLTag(checkIsResponseDescription) : checkIsResponseDescription;

  return (
    <div className="container-awnser">
        <div className="awnser">
          {question?.question && (
            <>
            {interpretedAwnser.split(/\r?\n/).map((item, index) => (
              hasHTMLTags ? (
                <p key={index} dangerouslySetInnerHTML={{ __html: item }}></p>
              ) : (
                <p key={index}>{item}</p>
              )
            ))}
            </>
          )}
        </div>
    </div>
  );
}

export default ContainerAwnser;
