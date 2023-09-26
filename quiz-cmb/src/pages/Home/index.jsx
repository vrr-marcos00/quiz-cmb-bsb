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

  return (
    <div className="main-page">
      {console.log(userType)}
      {userType === 'presenter' 
        ? <HomePresenter socket={socket} />
        : <HomeStudent socket={socket} />
      }
    </div>
  );
}

export default Home;