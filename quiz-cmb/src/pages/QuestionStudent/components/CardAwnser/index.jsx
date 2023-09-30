import React from "react";
import "./styles.css";

/**
 * Components
 */
import CardAlternatives from "../CardAlternatives";

function CardAwnser({
  theme,
  awnser,
  imgAwnser,
  alternatives,
  onClickAlternative,
  userPoints,
}) {
  return (
    <div className="main-card-awnser">
      <div className="card-awnser">
        <p className="card-awnser_theme">{theme}</p>

        {awnser && (
          <>
            {awnser.split(/\r?\n/).map((item, index) => (
              <p key={index} className="card-awnser_awnser">
                {item}
              </p>
            ))}
          </>
        )}

        {imgAwnser && <img src={imgAwnser} alt="imageAwnser" loading="lazy" />}
      </div>
      <h3 style={{ marginTop: "48px", marginBottom: 0 }}>
        Pontos: {userPoints}
      </h3>
      <CardAlternatives
        alternatives={alternatives}
        onClickButton={onClickAlternative}
      />
    </div>
  );
}

export default CardAwnser;
