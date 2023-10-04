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
  const navigate = useNavigate();

  const [userPoints, setUserPoints] = React.useState(
    localStorage.getItem("userPoints")
  );
  const { question: currentQuestion, level: currentPhase } = JSON.parse(
    localStorage.getItem("currentQuestion")
  );
  const [userCanAnswer, setUserCanAnswer] = React.useState(false);
  const [timer, setTimer] = React.useState(currentQuestion.time_per_question);
  const [userId, setUserId] = React.useState();
  const [userAnswerId, setUserAnswerId] = React.useState();
  const [isResponsePage, setIsResponsePage] = React.useState(false);

  const checkIsResponseDescription =
    currentQuestion?.description || currentQuestion?.question;

  React.useEffect(() => {
    const { userId } = JSON.parse(localStorage.getItem("roomUserId"));

    socket.on("show-answer", () => {
      setIsResponsePage(true);
      setUserCanAnswer(false);
    });

    socket.on("show-next-question", ({ question, level }) => {
      localStorage.setItem(
        "currentQuestion",
        JSON.stringify({ question, level })
      );
      setTimer(question.time_per_question);
      setIsResponsePage(false);
      restartAlternativesColors();
      setUserAnswerId(null);
      navigate("/question/student");
    });

    socket.on("show-classification", ({ classification, finishedGame }) => {
      localStorage.setItem(
        "classification",
        JSON.stringify({ classification, finishedGame })
      );
      navigate("/classification");
    });

    socket.on("updated-points", ({ classification }) => {
      const points = classification.find(
        (user) => userId === user.userId
      )?.points;
      localStorage.setItem("userPoints", points);
      setUserPoints(points);
    });

    socket.on("init-question-timer", ({ time_per_question }) => {
      setUserCanAnswer(true);
    });

    socket.on("update-question-time", ({ currentTime }) => {
      setTimer(currentTime);
    });

    setUserId(userId);
  }, []);

  const handleClickAlternative = (event) => {
    const getbuttons = document.querySelectorAll('.card-alternatives_buttons button');
    getbuttons.forEach((button) => {
      button.style.backgroundColor = "#fff";
      button.style.color = "#000";
    });
  };

  const handleClickAlternative = (event, answerId) => {
    restartAlternativesColors();

    const currentButton = document.getElementById(event.target.id);

    currentButton.style.backgroundColor = "#07abb9";
    currentButton.style.color = "#fff";
    setUserAnswerId(answerId);
    socket.emit("user-answer", { answerId, userId });
  };

  return (
    <div className="main-page-question-student">
      <Background />

      <TimeQuestion currentLevel={currentPhase} timer={timer / 1000} />

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
            : currentQuestion?.img_question
        }
        alternatives={currentQuestion?.alternatives}
        onClickAlternative={handleClickAlternative}
        userPoints={userPoints}
      />
    </div>
  );
}

export default QuestionStudent;
