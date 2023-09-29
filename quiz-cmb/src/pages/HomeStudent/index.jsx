import React from "react";
import "./styles.css";

/**
 * Components
 */
import EnterRoom from "./components/EnterRoom";

function HomeStudent({ socket }) {
  return (
    <div className="main-page-home-student">
      <EnterRoom socket={socket} />
    </div>
  );
}

export default HomeStudent;
