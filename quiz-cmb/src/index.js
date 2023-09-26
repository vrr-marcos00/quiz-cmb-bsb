import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);