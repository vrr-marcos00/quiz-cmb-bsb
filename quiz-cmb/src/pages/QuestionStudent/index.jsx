import React from 'react';
import './styles.css';

/**
 * Configs
 */
import { URL_SOCKET } from '../../configs';
import io from 'socket.io-client';

const socket = io(URL_SOCKET);

function QuestionStudent() {
  const [question, setQuestion] = React.useState({});

  React.useEffect(() => {
    socket.emit('getRandomQuestion');
    socket.on('question', (data) => {
      setQuestion(data);
    });
  }, []);

  return (
    <div className="main-page">
      <h1>Sala de perguntas</h1>
      <h2>{question.id}</h2>
    </div>
  );
}

export default QuestionStudent;
