import React from "react";
import "./styles.css";

import logoQuiz from "../../assets/images/logo_quiz.png";

function Eliminated({ socket }) {
  React.useEffect(() => {
    socket.emit("forceDisconnect");
  }, []);

  return (
    <div className="eliminated-main-page">
      <img className="logo" src={logoQuiz} alt="Logo Quiz" />
      <p className="initFirstPhrase">Infelizmente você foi</p>
      <p className="eliminated">DESCLASSIFICADO</p>
      <p className="secondPhrase">Muito obrigado pela sua participação!</p>
    </div>
  );
}

export default Eliminated;
