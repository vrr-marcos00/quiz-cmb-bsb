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
import EnterRoom from './components/EnterRoom';

const socket = io(URL_SOCKET);

function HomeStudent() {
  return (
    <div className="main-page">
      <EnterRoom socket={socket} />
    </div>
  );
}

export default HomeStudent;
