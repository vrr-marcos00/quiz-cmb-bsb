import React from "react";
import "./styles.css";

import logoQuiz from "../../assets/images/logo_quiz.png";

/**
 * Configs
 */
// import { URL_SOCKET } from '../../configs';
// import io from 'socket.io-client';

// const socket = io(URL_SOCKET);

function Eliminated() {
  return (
    <div className="main-page">
      <img className="logo" src={logoQuiz} alt="Logo Quiz" />
      <p className="initFirstPhrase">Infelizmente você foi</p>
      <p className="eliminated">DESCLASSIFICADO</p>
      <p className="secondPhrase">Muito obrigado pela sua participação!</p>
    </div>
  );
}

export default Eliminated;
