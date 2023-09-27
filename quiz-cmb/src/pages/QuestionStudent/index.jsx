import React from 'react';
import './styles.css';

/**
 * Components
 */
import Background from './components/Background';

/**
 * Configs
 */
import { URL_SOCKET } from '../../configs';
import io from 'socket.io-client';

const socket = io(URL_SOCKET);

function QuestionStudent() {
  const [question, setQuestion] = React.useState({});
  const [currentPhase, setCurrentPhase] = React.useState('');

  React.useEffect(() => {
    socket.on('question', (data) => {
      setQuestion(data);
    });
  }, []);

  console.log(question);

  return (
    <div className="main-page-question-student">
      <Background />
      <h1>Sala de perguntas</h1>
      <h2>{question.id}</h2>
    </div>
  );
}

export default QuestionStudent;
