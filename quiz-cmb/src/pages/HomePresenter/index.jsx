/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './styles.css';

/**
 * Configs
 */
import { URL_SOCKET } from '../../configs';
import io from 'socket.io-client';

/**
 * Components
 */
import CreateRoom from './components/CreateRoom';

const socket = io(URL_SOCKET);

function Home() {
  const [currentRoomInfo, setCurrentRoomInfo] = React.useState({});

  React.useEffect(() => {
    socket.on('currentRoom', (currentRoom) => {
      setCurrentRoomInfo(currentRoom);
    });
  }, []);

  return (
    <div className="main-page">
      <CreateRoom socket={socket} currentRoom={currentRoomInfo} />
    </div>
  );
}

export default Home;