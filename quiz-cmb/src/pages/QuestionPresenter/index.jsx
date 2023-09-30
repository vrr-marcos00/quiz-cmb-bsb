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
  const navigate = useNavigate();

  const { question: currentQuestion, level: currentPhase } = JSON.parse(
    localStorage.getItem("currentQuestion")
  );
  const [isResponsePage, setIsResponsePage] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);

  React.useEffect(() => {
    const { currentRoom } = JSON.parse(localStorage.getItem("currentRoom"));
    setAllUsers(currentRoom.users);

    socket.on("user-answer-to-presenter", ({ id }) => {
      setAllUsers((prevAllUsers) => {
        const updatedUsers = prevAllUsers.map((user) => {
          if (user.userId === id) {
            return { ...user, answered: true };
          }
          return user;
        });
        return updatedUsers;
      });
    });

    socket.on("show-next-question", ({ question, level }) => {
      localStorage.setItem(
        "currentQuestion",
        JSON.stringify({ question, level })
      );
      navigate("/question/presenter");
    });

    socket.on("show-classification", ({ classification, finishedGame }) => {
      localStorage.setItem(
        "classification",
        JSON.stringify({ classification, finishedGame })
      );
      navigate("/classification");
    });
  }, []);

  const handleShowQuestion = () => {
    socket.emit("show-answer");
    setIsResponsePage(true);
  };

  const handleNextQuestion = () => {
    socket.emit("foward");
    setIsResponsePage(false);
  };

  return (
    <div className="main-page-question-presenter">
      <Time currentLevel={currentPhase} />

      <div className="main-page_container">
        <div className="row-main">
          <ContainerTitle
            title={currentQuestion?.theme}
            isResponsePage={isResponsePage}
          />

          <ContainerQuestions
            question={currentQuestion}
            isResponsePage={isResponsePage}
          />

          <ContainerStudents students={allUsers} />

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
