import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

/**
 * Pages
*/
import HomePresenter from './pages/HomePresenter';
import HomeStudent from './pages/HomeStudent';
import WaitingRoom from './pages/WaitingRoom';
import QuestionStudent from './pages/QuestionStudent';
import QuestionPresenter from './pages/QuestionPresenter';
import Classification from './pages/Classification';
import Eliminated from './pages/Eliminated';

/**
 * Socket
*/
import { URL_SOCKET } from './configs';
const socket = io(URL_SOCKET);

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/home/presenter" element={<HomePresenter socket={socket} />} />
      <Route path="/home/student" element={<HomeStudent socket={socket} />} />
      <Route path="/waiting-room" element={<WaitingRoom socket={socket} />} />
      <Route path="/question/student" element={<QuestionStudent socket={socket} />} />
      <Route path="/question/presenter" element={<QuestionPresenter socket={socket} />} />
      <Route path="/classification" element={<Classification socket={socket} />} />
      <Route path="/eliminated" element={<Eliminated socket={socket} />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
