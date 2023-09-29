import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

function WaitingRoom({ socket }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    socket.on("show-next-question", ({ question, level }) => {
      console.log(question);
      localStorage.setItem(
        "currentQuestion",
        JSON.stringify({ question, level })
      );
      alert(level);
      navigate("/question/student");
    });
  }, []);

  return (
    <div className="main-page">
      <h1>Sala de espera</h1>
    </div>
  );
}

export default WaitingRoom;
