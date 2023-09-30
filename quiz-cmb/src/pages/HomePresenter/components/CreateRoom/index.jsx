/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./styles.css";

function CreateRoom({ socket, currentRoom }) {

  const [roomCode, setRoomCode] = React.useState("Nenhuma sala criada");

  const handleClickRoomCreate = () => {
    socket.emit("authenticate", { role: "presenter" });
    socket.on("roomCode", (roomCode) => {
      setRoomCode(roomCode);
    });
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
        {currentRoom && currentRoom.roomCode && (
          <div>
            <h3>Usuários conectados</h3>
            <ul>
              {currentRoom.users.map((user) => (
                <li key={user.socketId}>{user.studentId}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateRoom;
