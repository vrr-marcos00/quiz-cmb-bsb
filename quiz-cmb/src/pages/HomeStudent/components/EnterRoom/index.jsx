/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './styles.css';

function EnterRoom({ socket }) {
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
    <div className="container-home-student">
      <div className="home-student-title">
        <h1>QUIZ!</h1>
      </div>
      <div className="home-student-login">
        <input placeholder="Escola" onChange={(e) => setStudentId(e.target.value)} />
        <input placeholder="Código da sala" onChange={(e) => setRoomCode(e.target.value)} />
        <button onClick={handleClickEnterTheRoom}>Entrar na sala</button>
      </div>
    </div>
  )
}

export default EnterRoom;