import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WaitingRoom from './pages/WaitingRoom'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/waiting-room" element={<WaitingRoom />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);