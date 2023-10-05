import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

/**
 * Components
 */
import TimeAndTheme from "./components/TimeAndTheme";
import ContainerButtons from "./components/ContainerButtons";
import ContainerAlternatives from "./components/ContainerAlternatives";
import ContainerAwnser from "./components/ContainerAwnser";
// import ContainerStudents from "./components/ContainerStudents";
import Background from "./components/Background";

function QuestionPresenter({ socket }) {
  const navigate = useNavigate();

  const { question: currentQuestion, level } = JSON.parse(
    localStorage.getItem("currentQuestion")
  );
  const { phaseTimer: phaseTimerOriginal } = JSON.parse(
    localStorage.getItem("phaseTimer")
  );

  const [timer, setTimer] = React.useState(currentQuestion.time_per_question);
  const [phaseTimer, setPhaseTimer] = React.useState(phaseTimerOriginal);
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

    socket.on("show-next-question", ({ question, level, phase_timer }) => {
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

    socket.on("question-timeout", () => {
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

    socket.on("update-phase-time", ({ currentTime }) => {
      setPhaseTimer(currentTime);
    });
  }, []);

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
    <>
      <div className="main-page-question-presenter">
        <Background />

        <div className="main-page_container">
          <div className="row-main">
            <TimeAndTheme
              phaseTimer={phaseTimer}
              timer={timer / 1000}
              theme={currentQuestion?.theme}
              isResponsePage={isResponsePage}
              currentLevel={level}
            />

            <ContainerAwnser
              question={currentQuestion}
              isResponsePage={isResponsePage}
            />
          </div>

          <div className="container-alternatives">
            <ContainerAlternatives
              question={currentQuestion}
              isResponsePage={isResponsePage}
            />
          </div>

          <div className="container-buttons-question-presenter">
            <ContainerButtons
              isTimerRunning={isTimerRunning}
              handleNextQuestion={handleNextQuestion}
              handleInitTimer={handleInitTimer}
              isResponsePage={isResponsePage}
            />
          </div>
        </div>
      </div>

      {/* <ContainerStudents students={allUsers} isResponsePage={isResponsePage} /> */}
    </>
  );
}

export default QuestionPresenter;
