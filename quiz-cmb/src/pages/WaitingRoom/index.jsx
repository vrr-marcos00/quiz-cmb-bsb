import React from 'react';
import './styles.css';

/**
 * Images
 */
import logoQuiz from '../../assets/images/logo_quiz.png';

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
    <div className="main-page-waiting-room">
      <div className="logo-quiz">
        <img src={logoQuiz} alt="Logo Quiz" />
      </div>
      <div className="waiting-loader">
        <div>
          <h1>Aguarde</h1>
        </div>

        <div class="loader-tres-pontinhos">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
