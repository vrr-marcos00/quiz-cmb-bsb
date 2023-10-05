/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./styles.css";

import { useNavigate } from "react-router-dom";

/**
 * Images
 */
import imageLogo from "../../../../assets/images/logo_quiz.png";

function EnterRoom({ socket }) {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = React.useState("");
  const [studentId, setStudentId] = React.useState("");

  React.useEffect(() => {
    socket.on("studentAuthenticated", ({ userId, msg }) => {
      localStorage.setItem("roomUserId", JSON.stringify({ userId }));
      navigate("/waiting-room");
    });

    socket.on("userIsExistingInTheRoom", (message) => {
      alert(message);
    });

    socket.on("roomError", (message) => {
      alert(message);
    });
  }, []);

  const handleClickEnterTheRoom = () => {
    if (!studentId) {
      alert("Nome obrigatório");
      return;
    }

    if (!roomCode) {
      alert("RoomCode obrigatório");
      return;
    }

    localStorage.setItem("studentId", studentId);
    socket.emit("authenticate", { role: "student" });
    socket.emit("joinRoom", roomCode, studentId);
  };

  const schools = [
    "CMB",
    "CMBEL",
    "CMBH",
    "CMC",
    "CMCG",
    "CMF",
    "CMM",
    "CMPA",
    "CMR",
    "CMRJ",
    "CMSM",
    "CMSP",
    "CMVM",
    "CMJF",
    'CMS',
    "FORJ"
  ];

  return (
    <div className="container-home-student">
      <div className="logo-home-student">
        <img src={imageLogo} alt="logo" />
      </div>
      <div className="home-student-title">
        <h1>Desafio Global do Conhecimento</h1>
      </div>
      <div className="home-student-login">
        <select
          name="players"
          id="players"
          onChange={(e) => setStudentId(e.target.value)}
        >
          {schools.map((school) => (
            <option value={school}>{school}</option>
          ))}
        </select>
        <input
          placeholder="Código da sala"
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button onClick={handleClickEnterTheRoom}>Entrar na sala</button>
      </div>
    </div>
  );
}

export default EnterRoom;
