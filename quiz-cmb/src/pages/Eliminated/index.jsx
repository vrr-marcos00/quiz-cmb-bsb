import React from "react";
import "./styles.css";

/**
 * Configs
 */
// import { URL_SOCKET } from '../../configs';
// import io from 'socket.io-client';

// const socket = io(URL_SOCKET);

function Eliminated() {
  return (
    <div className="main-page">
      <p className="emoji">😞</p>
      <p className="initFirstPhrase">Infelizmente você foi</p>
      <p className="eliminated">DESCLASSIFICADO</p>
      <p className="secondPhrase">Muito obrigado pela sua participação!</p>
    </div>
  );
}

export default Eliminated;
