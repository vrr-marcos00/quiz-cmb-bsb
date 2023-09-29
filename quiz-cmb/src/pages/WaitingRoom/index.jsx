import React from 'react';
import './styles.css';

/**
 * Images
 */
import logoQuiz from '../../assets/images/logo_quiz.png';

function WaitingRoom({ socket }) {
  React.useEffect(() => {
    socket.on('initGame', () => {
      window.location.href = '/question/student';
    });
  }, []);
  // }, [socket]);

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
