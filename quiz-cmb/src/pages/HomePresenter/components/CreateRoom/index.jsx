/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

/**
 * Components
 */
import LoggedInUsers from "../LoggedInUsers";

function CreateRoom({ socket, currentRoom }) {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = React.useState("Nenhuma sala criada");

  const handleClickRoomCreate = () => {
    socket.emit("authenticate", { role: "presenter" });
    socket.on("roomCode", (roomCode) => {
      setRoomCode(roomCode);
    });
  };

  const handleInitSala = () => {
    socket.emit("init-quiz");
    localStorage.setItem('currentRoom', JSON.stringify({ currentRoom }));

    navigate("/rules/presenter");
  };
  const hasUsers = currentRoom && currentRoom.users && currentRoom.users.length > 0;

  return (
    <div className="container-create-room">
      <h1 className="create-room-title">Desafio Global do Conhecimento 2023</h1>
      <div className="create-room-row">
        <div className="room-code">
          <h3>{roomCode}</h3>
        </div>

        <div className="container-button-home-presenter">
          <button onClick={handleClickRoomCreate}>Criar Sala</button>
          <button onClick={handleInitSala}>Iniciar Sala</button>
        </div>

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
