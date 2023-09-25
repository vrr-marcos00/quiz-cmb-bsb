import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SocketTest from './pages/SocketTest';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<SocketTest />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);