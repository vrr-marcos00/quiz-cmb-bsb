import React from "react";
import "./styles.css";

/**
 * Components
 */
import Background from "./components/Background";
import CardAwnser from "./components/CardAwnser";
import TimeQuestion from "./components/TimeQuestion";

function QuestionStudent({ socket }) {
  const [userId, setUserId] = React.useState();
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [currentPhase, setCurrentPhase] = React.useState("");
  const [isResponsePage, setIsResponsePage] = React.useState(false);

  const checkIsResponseDescription =
    currentQuestion?.description || currentQuestion?.question;

  React.useEffect(() => {
    const { question, level } = JSON.parse(
      localStorage.getItem("currentQuestion")
    );

    const { userId } = JSON.parse(localStorage.getItem("roomUserId"));

    socket.on("show-answer", () => {
      setIsResponsePage(true);
    });

    setCurrentQuestion(question);
    setCurrentPhase(level);
    setUserId(userId);
  }, []);

  React.useEffect(() => {
    const alternativeCorrect = document.getElementById(
      `button-${currentQuestion.correct_answer_id}`
    );

    if (isResponsePage) {
      if (alternativeCorrect) {
        alternativeCorrect.style.backgroundColor = "#0F0";
      }
    } else {
      if (alternativeCorrect) {
        alternativeCorrect.style.backgroundColor = "#fff";
      }
    }
  }, [isResponsePage, currentQuestion.correct_answer_id]);

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

    socket.emit("user-answer", { answerId, userId });
  };

  return (
    <div className="main-page-question-student">
      <Background />

      <TimeQuestion currentLevel={currentPhase} />

      <CardAwnser
        theme={isResponsePage ? "Resposta" : currentQuestion?.theme}
        awnser={
          isResponsePage
            ? checkIsResponseDescription
            : currentQuestion?.question
        }
        imgAwnser={
          isResponsePage
            ? currentQuestion?.img_response
            : currentQuestion?.img_awnser
        }
        alternatives={currentQuestion?.alternatives}
        onClickAlternative={handleClickAlternative}
      />
    </div>
  );
}

export default QuestionStudent;
