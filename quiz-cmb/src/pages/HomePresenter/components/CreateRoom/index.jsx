/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

function CreateRoom({ socket }) {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = React.useState("Nenhuma sala criada");
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
      navigate("/question/presenter");
    });

    socket.on("initGameError", (message) => {
      alert(message);
    });
  }, []);

  const handleClickRoomCreate = () => {
    socket.emit("authenticate", { role: "presenter" });
    socket.on("roomCode", (roomCode) => {
      setRoomCode(roomCode);
    });
  };

  const handleDisconnectAllUsers = () => {
    socket.emit("disconnectAllUsers");
    socket.emit("forceDisconnect");
  };

  const handleIniteGame = () => {
    socket.emit("init-quiz");
  };

  return (
    <div className="container-create-room">
      <h1 className="create-room-title">QUIZ!</h1>
      <div className="create-room-row">
        <div className="room-code">
          <h3>{roomCode}</h3>
        </div>

        <button onClick={handleClickRoomCreate}>Criar Sala</button>
        <button onClick={handleIniteGame}>Iniciar Game</button>
      </div>
      <div>
        {currentRoomInfo && currentRoomInfo.roomCode && (
          <div>
            <h3>Usuários conectados</h3>
            <ul>
              {currentRoomInfo.users.map((user) => (
                <li key={user.userId}>{user.studentId}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateRoom;
