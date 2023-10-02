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
  const [timer, setTimer] = React.useState(currentQuestion.time_per_question);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
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
      setTimer(question.time_per_question);
      navigate("/question/presenter");
    });

    socket.on("show-classification", ({ classification, finishedGame }) => {
      localStorage.setItem(
        "classification",
        JSON.stringify({ classification, finishedGame })
      );
      navigate("/classification");
    });

    socket.on("question-timeout", ({ classification, finishedGame }) => {
      socket.emit("show-answer");
      setIsResponsePage(true);
      setIsTimerRunning(false);
      setAllUsers((prevAllUsers) => {
        const updatedUsers = prevAllUsers.map((user) => {
          if (!user?.answered) {
            return { ...user, answered: false };
          }
          return user;
        });
        return updatedUsers;
      });
    });

    socket.on("update-question-time", ({ currentTime }) => {
      setTimer(currentTime);
    });
  }, []);

  const handleShowQuestion = () => {
    socket.emit("show-answer");
    setIsResponsePage(true);
    setAllUsers((prevAllUsers) => {
      const updatedUsers = prevAllUsers.map((user) => {
        if (!user?.answered) {
          return { ...user, answered: false };
        }
        return user;
      });
      return updatedUsers;
    });
  };

  const handleNextQuestion = () => {
    socket.emit("foward");
    setIsResponsePage(false);
    setAllUsers((prevAllUsers) => {
      const updatedUsers = prevAllUsers.map((user) => {
        return { ...user, answered: false }; // Define 'answered' como false para todos os usuários.
      });
      return updatedUsers;
    });
  };

  const handleInitTimer = () => {
    socket.emit("init-question-timer");
    setIsTimerRunning(true);
  };

  return (
    <div className="main-page-question-presenter">
      <Time timer={timer / 1000} />

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

          <ContainerStudents
            students={allUsers}
            isResponsePage={isResponsePage}
          />

          <ContainerButtons
            isTimerRunning={isTimerRunning}
            handleNextQuestion={handleNextQuestion}
            handleShowQuestion={handleShowQuestion}
            handleInitTimer={handleInitTimer}
            isResponsePage={isResponsePage}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionPresenter;
