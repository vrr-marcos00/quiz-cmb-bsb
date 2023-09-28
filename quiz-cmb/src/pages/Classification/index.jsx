import React from 'react';
import './styles.css';

/**
 * Components
 */
import FirstPlaced from './components/FirstPlaced';

/**
 * Configs
 */
// import { URL_SOCKET } from '../../configs';
// import io from 'socket.io-client';

// const socket = io(URL_SOCKET);

function Classification() {
  return (
    <div className="main-page-classification">
      <div className="container-page-classification">
        <div>
          <h1>Classificação</h1>
        </div>
        <div className="firt-classified">
          <FirstPlaced />
        </div>
      </div>
    </div>
  );
}

export default Classification;
