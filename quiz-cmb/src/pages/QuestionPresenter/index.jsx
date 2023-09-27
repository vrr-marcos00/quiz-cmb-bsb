import React from 'react';
import './styles.css';

/**
 * Configs
 */
import { URL_SOCKET } from '../../configs';
import io from 'socket.io-client';

const socket = io(URL_SOCKET);

function QuestionPresenter() {
  const [question, setQuestion] = React.useState({});

  React.useEffect(() => {
    socket.emit('start-game');
    socket.on('question', (data) => {
      setQuestion(data);
    });
  }, []);

  const handleNextQuestion = () => {
    socket.emit('next-question');
  };

  return (
    <div className="main-page">
      <h1>Sala de perguntas</h1>
      <h2>{question.id}</h2>
      <button onClick={handleNextQuestion}>Próxima Pergunta</button>
    </div>
  );
}

export default QuestionPresenter;
