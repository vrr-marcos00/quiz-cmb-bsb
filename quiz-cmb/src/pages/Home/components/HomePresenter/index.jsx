/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

function HomePresenter({ socket }) {
  const [roomCode, setRoomCode] = React.useState('Sem Código')

  React.useEffect(() => {
    socket.emit('clearFileRoom');
  }, []);

  const handleClickRoomCreate = () => {
    socket.emit('authenticate', { role: 'presenter' });
    socket.on('roomCode', (roomCode) => {
      setRoomCode(roomCode);
    });
  };

  return (
    <div className="main-page">
      <div>
        <h1>Apresentador</h1>
        <h3>Código: {roomCode}</h3>
      </div>
      <div>
        <button onClick={handleClickRoomCreate}>Criar Sala</button>
      </div>
    </div>
  )
}

export default HomePresenter;