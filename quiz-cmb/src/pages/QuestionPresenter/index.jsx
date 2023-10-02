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
import Background from './components/Background';

function QuestionPresenter({ socket }) {
  const navigate = useNavigate();
  const mainPageContainerRef = React.useRef(null);

  const { question: currentQuestion} = JSON.parse(
    localStorage.getItem("currentQuestion")
  );
  const [isResponsePage, setIsResponsePage] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);
  const [topValue, setTopValue] = React.useState("0px");

  function getHeightOfMainPageContainer() {
    const height = mainPageContainerRef.current.clientHeight / 2 + 45;
    setTopValue(`${height}px`)
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

  return (
    <>
      <div className="main-page-question-presenter">
        <Background />

        <div className="main-page_container" ref={mainPageContainerRef}>
          <div className="row-main">
            <TimeAndTheme theme={currentQuestion?.theme} isResponsePage={isResponsePage} />

            <ContainerAwnser question={currentQuestion} isResponsePage={isResponsePage} />
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
        handleNextQuestion={handleNextQuestion}
        handleShowQuestion={handleShowQuestion}
        isResponsePage={isResponsePage}
      />
    </>
  );
}

export default QuestionPresenter;
