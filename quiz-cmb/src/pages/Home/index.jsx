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
import HomePresenter from './components/HomePresenter';
import HomeStudent from './components/HomeStudent';

const socket = io(URL_SOCKET);

function Home() {
  const userType = new URLSearchParams(window.location.search).get('userType')
  const [currentRoomInfo, setCurrentRoomInfo] = React.useState({});

  React.useEffect(() => {
    localStorage.setItem('userType', userType);
    socket.on('currentRoom', (currentRoom) => {
      setCurrentRoomInfo(currentRoom);
    });
  }, []);

  return (
    <div className="main-page">
      {userType === 'presenter' 
        ? <HomePresenter socket={socket} currentRoom={currentRoomInfo} />
        : <HomeStudent socket={socket} />
      }
    </div>
  );
}

export default Home;