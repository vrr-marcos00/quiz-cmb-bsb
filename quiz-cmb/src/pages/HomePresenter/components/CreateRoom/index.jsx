/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './styles.css';

function CreateRoom({ socket }) {
  const [roomCode, setRoomCode] = React.useState('Nenhuma sala criada');
  const [currentRoomInfo, setCurrentRoomInfo] = React.useState({});

  React.useEffect(() => {
    socket.emit('clearFileRoom');

    socket.on('currentRoom', (currentRoom) => {
      setCurrentRoomInfo(currentRoom);
    });

    socket.on('initGame', () => {
      window.location.href = '/question/presenter';
    });

    socket.on('initGameError', (message) => {
      alert(message);
    });
  }, []);
  // }, [socket]);


  const handleClickRoomCreate = () => {
    socket.emit('authenticate', { role: 'presenter' });
    socket.on('roomCode', (roomCode) => {
      setRoomCode(roomCode);
    });
  };

  const handleDisconnectAllUsers = () => {
    socket.emit('disconnectAllUsers');
    socket.emit('forceDisconnect');
  };

  const handleIniteGame = () => {
    socket.emit('initQuiz');
  };

  return (
    <div className="container-create-room">
      <h1 className="create-room-title">Desafio Global do Conhecimento</h1>
      <div className="create-room-row">
        <div className="room-code">
          <h3>{roomCode}</h3>
        </div>
        
        <button onClick={handleClickRoomCreate}>Criar Sala</button>
        <button onClick={handleIniteGame}>Iniciar Game</button>
      </div>
      {/* <div>
        {currentRoomInfo && currentRoomInfo.roomCode && (
          <div>
            <h3>Usuários conectados</h3>
            <ul>
              {currentRoomInfo.users.map((user) => (
                <li key={user.socketId}>{user.studentId}</li>
              ))}
            </ul>
          </div>
        )}
      </div> */}
    </div>
  )
}

export default CreateRoom;