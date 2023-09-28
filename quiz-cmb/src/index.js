import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/home/presenter" element={<HomePresenter />} />
      <Route path="/home/student" element={<HomeStudent />} />
      <Route path="/waiting-room" element={<WaitingRoom />} />
      <Route path="/question/student" element={<QuestionStudent />} />
      <Route path="/question/presenter" element={<QuestionPresenter />} />
      <Route path="/classification" element={<Classification />} />
      <Route path="/eliminated" element={<Eliminated />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);