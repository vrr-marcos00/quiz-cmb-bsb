import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

/**
 * Images
 */
import logoQuiz from "../../assets/images/logo_quiz.png";

function WaitingRoom({ socket }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    socket.on("show-next-question", ({ question, level }) => {
      localStorage.setItem(
        "currentQuestion",
        JSON.stringify({ question, level })
      );
      localStorage.setItem("userPoints", 10);
      localStorage.setItem("isPresenter", "");
      navigate("/question/student");
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
