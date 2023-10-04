/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./styles.css";

/**
 * Components
 */
import CreateRoom from "./components/CreateRoom";

function Home({ socket }) {
  const [currentRoomInfo, setCurrentRoomInfo] = React.useState({});

  React.useEffect(() => {
    socket.emit("clearFileRoom");

    socket.on("currentRoom", (currentRoom) => {
      setCurrentRoomInfo(currentRoom);
    });

    socket.on("initGameError", (message) => {
      alert(message);
    });
  }, []);

  return (
    <div className="main-page-home-presenter">
      <CreateRoom socket={socket} currentRoom={currentRoomInfo} />
    </div>
  );
}

export default Home;
