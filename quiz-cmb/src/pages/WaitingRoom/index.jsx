import React from 'react';
import './styles.css';

/**
 * Configs
 */
import { URL_SOCKET } from '../../configs';
import io from 'socket.io-client';

const socket = io(URL_SOCKET);

function WaitingRoom() {
  React.useEffect(() => {
    socket.on('initGame', () => {
      window.location.href = '/question/student';
    });
  }, []);

  return (
    <div className="main-page">
      <h1>Sala de espera</h1>
    </div>
  );
}

export default WaitingRoom;
