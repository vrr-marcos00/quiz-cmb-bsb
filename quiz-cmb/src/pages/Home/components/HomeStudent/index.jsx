/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

function HomeStudent({ socket }) {
  const [roomCode, setRoomCode] = React.useState('')
  const [studentId, setStudentId] = React.useState('')

  React.useEffect(() => {
    socket.on('studentAuthenticated', (message) => {
      window.location.href = '/waiting-room';
    });

    socket.on('userIsExistingInTheRoom', (message) => {
      alert(message);
    });

    socket.on('roomError', (message) => {
      alert(message);
    });

    socket.on('initGame', () => {
      console.log('GAME DEVE SER INICIADO');
    });
  }, []);

  const handleClickEnterTheRoom = () => {
    if (!studentId) {
      alert('Nome obrigatório');
      return;
    }
    
    if (!roomCode) {
      alert('RoomCode obrigatório');
      return;
    }

    socket.emit('authenticate', { role: 'student' });
    socket.emit('joinRoom', roomCode, studentId);
  };

  return (
    <div className="main-page">
      <div>
        <h1>Estudante</h1>
      </div>
      <div>
        <h3>Digite o nome da escola</h3>
        <input onChange={(e) => setStudentId(e.target.value)} />

        <h3>Digite o id da sala</h3>
        <input onChange={(e) => setRoomCode(e.target.value)} />

        <button onClick={handleClickEnterTheRoom}>Entrar na sala</button>
      </div>
    </div>
  )
}

export default HomeStudent;