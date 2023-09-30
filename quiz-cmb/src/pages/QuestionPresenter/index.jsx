import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

/**
 * Components
 */
import Time from "./components/Time/Index";
import ContainerButtons from "./components/ContainerButtons";
import ContainerQuestions from "./components/ContainerQuestions";
import ContainerTitle from "./components/ContainerTitle";
import ContainerStudents from "./components/ContainerStudents";

function QuestionPresenter({ socket }) {
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [currentPhase, setCurrentPhase] = React.useState("easy");
  const [isResponsePage, setIsResponsePage] = React.useState(false);

  React.useEffect(() => {
    const { question, level } = JSON.parse(
      localStorage.getItem("currentQuestion")
    );
    setCurrentQuestion(question);
    setCurrentPhase(level);
    // socket.emit('start-game');
    // socket.on('question', (data) => {
    //   setQuestion(data);
    // });
  }, []);
  console.log("currentQuestion", currentQuestion);

  const handleShowQuestion = () => {
    socket.emit("show-answer");
    setIsResponsePage(true);
  };

  const handleNextQuestion = () => {
    socket.emit("next-question");
    setIsResponsePage(false);
  };

  return (
    <div className="main-page-question-presenter">
      <Time currentLevel={currentPhase} />

      <div className="main-page_container">
        <div className="row-main">
          <ContainerTitle title={currentQuestion?.theme} isResponsePage={isResponsePage} />

          <ContainerQuestions question={currentQuestion} isResponsePage={isResponsePage} />

          <ContainerStudents students={[]} />

          <ContainerButtons
            handleNextQuestion={handleNextQuestion}
            handleShowQuestion={handleShowQuestion}
            isResponsePage={isResponsePage}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionPresenter;
