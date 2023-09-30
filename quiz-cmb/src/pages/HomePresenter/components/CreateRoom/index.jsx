/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./styles.css";

/**
 * Components
 */
 import LoggedInUsers from "../LoggedInUsers";

function CreateRoom({ socket, currentRoom }) {
  const [roomCode, setRoomCode] = React.useState("Nenhuma sala criada");

  const handleClickRoomCreate = () => {
    socket.emit("authenticate", { role: "presenter" });
    socket.on("roomCode", (roomCode) => {
      setRoomCode(roomCode);
    });
  };

  const handleInitGame = () => {
    socket.emit("init-quiz");
    localStorage.setItem('currentRoom', JSON.stringify({currentRoom}));
  };
  const hasUsers = currentRoom && currentRoom.users && currentRoom.users.length > 0;

  return (
    <div className="container-create-room">
      <h1 className="create-room-title">QUIZ!</h1>
      <div className="create-room-row">
        <div className="room-code">
          <h3>{roomCode}</h3>
        </div>

        <button onClick={handleClickRoomCreate}>Criar Sala</button>
        <button onClick={handleInitGame}>Iniciar Game</button>

        {hasUsers ? (
          <LoggedInUsers currentRoom={currentRoom} />
        ) : (
          <div className="has-user">
            <h2>Nenhum usuário na sala</h2>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default CreateRoom;
