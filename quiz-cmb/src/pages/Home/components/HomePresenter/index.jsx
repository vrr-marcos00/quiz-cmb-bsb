/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

function HomePresenter({ socket, currentRoom }) {
  const [roomCode, setRoomCode] = React.useState('Sem Código')

  React.useEffect(() => {
    socket.emit('clearFileRoom');

    socket.on('initGame', () => {
      console.log('GAME DEVE SER INICIADO');
    });

    socket.on('initGameError', (message) => {
      alert(message);
    });
  }, []);

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
    <div className="main-page">
      <div>
        <h1>Apresentador</h1>
        <h3>Código: {roomCode}</h3>
      </div>
      <div>
        <button onClick={handleClickRoomCreate}>Criar Sala</button>
        <button onClick={handleDisconnectAllUsers}>Disconectar todos os usuários</button>
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
  )
}

export default HomePresenter;