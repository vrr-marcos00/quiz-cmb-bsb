import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

/**
 * Components
 */
import Background from "./components/Background";
import CardAwnser from "./components/CardAwnser";
import TimeQuestion from "./components/TimeQuestion";

function QuestionStudent({ socket }) {
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [currentPhase, setCurrentPhase] = React.useState("");

  React.useEffect(() => {
    const { question, level } = JSON.parse(
      localStorage.getItem("currentQuestion")
    );

    setCurrentQuestion(question);
    setCurrentPhase(level);
  }, []);
  console.log("currentQuestion", currentQuestion);

  const handleClickAlternative = (event, answerId) => {
    const getbuttons = document.querySelectorAll(
      ".card-alternatives_buttons button"
    );
    getbuttons.forEach((button) => {
      button.style.backgroundColor = "#fff";
      button.style.color = "#000";
    });

    const currentButton = document.getElementById(event.target.id);
    currentButton.style.backgroundColor = "#07abb9";
    currentButton.style.color = "#fff";

    socket.emit("user-answer", { answerId });
  };

  return (
    <div className="main-page-question-student">
      <Background />

      <TimeQuestion />

      <CardAwnser
        theme={currentQuestion?.theme}
        awnser={currentQuestion?.question}
        imgAwnser={currentQuestion?.img_response}
        alternatives={currentQuestion?.alternatives}
        onClickAlternative={handleClickAlternative}
      />
    </div>
  );
}

export default QuestionStudent;
