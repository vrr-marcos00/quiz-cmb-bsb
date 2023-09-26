import React from 'react';

function HomeStudent({ socket }) {
  const [roomCode, setRoomCode] = React.useState('')
  const [studentId, setStudentId] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClickEnterTheRoom = () => {

    if (!roomCode) {
      alert('RoomCode obrigatório');
      return;
    }

    if (!studentId) {
      alert('RoomCode obrigatório');
      return;
    }

    socket.emit('authenticate', { role: 'student' });
    socket.emit('joinRoom', roomCode, studentId);

    socket.on('studentAuthenticated', (message) => {
      console.log(message)
      setSuccessMessage(message);
    });

    socket.on('userIsExistingInTheRoom', (message) => {
      setErrorMessage(message);
    });

    socket.on('roomError', (message) => {
      setErrorMessage(message);
    });
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

        <h5>{successMessage}</h5>
        <h5>{errorMessage}</h5>
      </div>
    </div>
  )
}

export default HomeStudent;