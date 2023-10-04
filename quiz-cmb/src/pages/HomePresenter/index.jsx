/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

/**
 * Components
 */
import CreateRoom from "./components/CreateRoom";

function Home({ socket }) {
  const navigate = useNavigate();
  const [currentRoomInfo, setCurrentRoomInfo] = React.useState({});

  React.useEffect(() => {
    socket.emit("clearFileRoom");

    socket.on("currentRoom", (currentRoom) => {
      setCurrentRoomInfo(currentRoom);
    });

    socket.on("show-next-question", ({ question, level }) => {
      localStorage.setItem(
        "currentQuestion",
        JSON.stringify({ question, level })
      );

      localStorage.setItem("isPresenter", true);

      navigate("/question/presenter");
    });

    socket.on("initGameError", (message) => {
      alert(message);
    });
  }, []);
  // }, [socket]);

  return (
    <div className="main-page-home-presenter">
      <CreateRoom socket={socket} currentRoom={currentRoomInfo} />
    </div>
  );
}

export default Home;
