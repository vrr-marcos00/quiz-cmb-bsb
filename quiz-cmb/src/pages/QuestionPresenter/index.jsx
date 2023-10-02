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
import ContainerStudents from "./components/ContainerStudents";
import Background from "./components/Background";

function QuestionPresenter({ socket }) {
  const navigate = useNavigate();
  const mainPageContainerRef = React.useRef(null);

  const { question: currentQuestion } = JSON.parse(
    localStorage.getItem("currentQuestion")
  );
  const [timer, setTimer] = React.useState(currentQuestion.time_per_question);
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [isResponsePage, setIsResponsePage] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [topValue, setTopValue] = React.useState("0px");

  function getHeightOfMainPageContainer() {
    const height = mainPageContainerRef.current.clientHeight / 2 + 45;
    setTopValue(`${height}px`);
  }

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

  React.useEffect(() => {
    const observer = new MutationObserver(getHeightOfMainPageContainer);

    if (mainPageContainerRef.current) {
      observer.observe(mainPageContainerRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      getHeightOfMainPageContainer();
    }

    return () => {
      observer.disconnect();
    };
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

  // <Time timer={timer / 1000} />

  return (
    <>
      <div className="main-page-question-presenter">
        <Background />

        <div className="main-page_container" ref={mainPageContainerRef}>
          <div className="row-main">
            <TimeAndTheme
              theme={currentQuestion?.theme}
              isResponsePage={isResponsePage}
            />

            <ContainerAwnser
              question={currentQuestion}
              isResponsePage={isResponsePage}
            />
          </div>
        </div>

        <ContainerAlternatives
          question={currentQuestion}
          isResponsePage={isResponsePage}
          className={{ marginTop: topValue }}
        />
      </div>

      <ContainerStudents students={allUsers} isResponsePage={isResponsePage} />

      <ContainerButtons
        isTimerRunning={isTimerRunning}
        handleNextQuestion={handleNextQuestion}
        handleShowQuestion={handleShowQuestion}
        handleInitTimer={handleInitTimer}
        isResponsePage={isResponsePage}
      />
    </>
  );
}

export default QuestionPresenter;
