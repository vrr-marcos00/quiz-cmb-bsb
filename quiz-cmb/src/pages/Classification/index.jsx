import React from "react";
import "./styles.css";

/**
 * Components
 */
import FirstPlaced from "./components/FirstPlaced";

function Classification({ socket }) {
  return (
    <>
      <div className="container-page-classification">
        <div>
          <h1>Classificação</h1>
        </div>
        <div className="firt-classified">
          <FirstPlaced />
        </div>
      </div>
    </>
  );
}

export default Classification;
