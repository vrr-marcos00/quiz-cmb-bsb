import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

/**
 * Components
 */
import FirstPlaced from "./components/FirstPlaced";

function Classification({ socket }) {
  const navigate = useNavigate();
  const { classification, finishedGame } = JSON.parse(
    localStorage.getItem("classification")
  );

  const isPresenter = localStorage.getItem("isPresenter");

  React.useEffect(() => {
    socket.on("show-next-question", ({ question, level }) => {
      localStorage.setItem(
        "currentQuestion",
        JSON.stringify({ question, level })
      );
      navigate(`/question/${isPresenter ? "presenter" : "student"}`);
    });
  }, []);

  const handleFowardButtonClick = () => {
    socket.emit("foward");
  };

  return (
    <>
      <div className="container-page-classification">
        <div className="firt-classified">
          <FirstPlaced classification={classification} />
          <div className="row-main_buttons-classification">
            {isPresenter && !finishedGame && (
              <button onClick={handleFowardButtonClick}>Avançar</button>
            )}
            {finishedGame && <h1 className="finished-game">Jogo Finalizado!</h1>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Classification;
