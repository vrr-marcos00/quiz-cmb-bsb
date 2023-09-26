import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WaitingRoom from './pages/WaitingRoom';
import QuestionStudent from './pages/QuestionStudent';
import QuestionPresenter from './pages/QuestionPresenter';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/waiting-room" element={<WaitingRoom />} />
      <Route path="/question-student" element={<QuestionStudent />} />
      <Route path="/question-presenter" element={<QuestionPresenter />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);