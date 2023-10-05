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
    socket.on("show-next-question", ({ question, level, phase_timer }) => {
      localStorage.setItem(
        "currentQuestion",
        JSON.stringify({ question, level })
      );
      localStorage.setItem(
        "phaseTimer",
        JSON.stringify({ phaseTimer: phase_timer })
      );

      if (!isPresenter) {
        const { userId } = JSON.parse(localStorage.getItem("roomUserId"));
        const isUserOnClassification = classification
          .filter((classificationUser) => !classificationUser.eliminated)
          .some((classificationUser) => classificationUser.userId === userId);

        if (!isUserOnClassification) {
          localStorage.setItem("roomUserId", JSON.stringify({ userId: "" }));
          navigate("/eliminated");
        } else {
          navigate(`/question/student`);
        }
      } else {
        navigate(`/question/presenter`);
      }
    });
  }, []);

  React.useEffect(() => {
    if (finishedGame) {
      const blob = new Blob([JSON.stringify(classification)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "auditsGame.json";

      a.click();

      window.URL.revokeObjectURL(url);
    }
  }, []);

  const handleFowardButtonClick = () => {
    socket.emit("init-phase-timer");
    socket.emit("foward");
  };

  return (
    <>
      <div className="container-page-classification">
        <div className="firt-classified">
          <FirstPlaced
            classification={classification.filter((user) => !user.eliminated)}
          />
          <div className="row-main_buttons-classification">
            {isPresenter && !finishedGame && (
              <button onClick={handleFowardButtonClick}>Avançar</button>
            )}
            {finishedGame && (
              <h1 className="finished-game">Jogo Finalizado!</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Classification;
