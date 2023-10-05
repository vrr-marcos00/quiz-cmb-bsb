/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./styles.css";

/**
 * Components
 */
import LoggedInUsers from "../LoggedInUsers";

/**
 * Images
 */
import imageQuiz from "../../../../assets/images/logo_quiz.png"

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
    localStorage.setItem('currentRoom', JSON.stringify({ currentRoom }));
  };
  const hasUsers = currentRoom && currentRoom.users && currentRoom.users.length > 0;

  return (
    <div className="container-create-room">
      <div className="create-room-container-title">
        <p className="create-room-title">Desafio Global do Conhecimento</p>
        <img src={imageQuiz} alt="Quiz" />
      </div>
      <div className="create-room-row">
        <div className="room-code-container">
          <div className="room-code">
            <p>{roomCode}</p>
          </div>

          <div className="container-button-home-presenter">
            <button onClick={handleClickRoomCreate}>Criar Sala</button>
            <button onClick={handleInitGame}>Iniciar Game</button>
          </div>
        </div>

        <div className="logged-users-container">
          {hasUsers ? (
            <LoggedInUsers currentRoom={currentRoom} />
          ) : (<div className="has-user">
            <p>Nenhum usuário na sala</p>
          </div>
          )}
        </div>




      </div>
    </div>
  );
}

export default CreateRoom;
