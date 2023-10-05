import React from "react";
import "./styles.css";

/**
 * Components
 */
import CardAlternatives from "../CardAlternatives";

/**
 * Utils
 */
import { interpretStringWithHTMLTag, containsHTMLTags } from "../../../../utils/interpretStringWithHTMLTag";


function CardAwnser({
  theme,
  awnser,
  imgAwnser,
  alternatives,
  onClickAlternative,
}) {
  const hasHTMLTags = containsHTMLTags(awnser);
  const interpretedAwnser = hasHTMLTags ? interpretStringWithHTMLTag(awnser) : awnser;

  return (
    <div className="main-card-awnser">
      <div className="card-awnser">
        <p className="card-awnser_theme">{theme}</p>

        {awnser && (
          <>
            {interpretedAwnser.split(/\r?\n/).map((item, index) => (
              hasHTMLTags ? (
                <p key={index} className="card-awnser_awnser" dangerouslySetInnerHTML={{ __html: item }}></p>
              ) : (
                <p key={index} className="card-awnser_awnser">{item}</p>
              )
            ))}
          </>
        )}

        {imgAwnser && <img src={imgAwnser} alt="imageAwnser" loading="lazy" />}
      </div>
      <CardAlternatives
        alternatives={alternatives}
        onClickButton={onClickAlternative}
      />
    </div>
  );
}

export default CardAwnser;
