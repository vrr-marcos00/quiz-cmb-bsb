import React from 'react';
import './styles.css';

/**
 * Components
 */
import Background from './components/Background';
import CardAwnser from './components/CardAwnser';
import TimeQuestion from './components/TimeQuestion';

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

  const handleClickAlternative = (event) => {
    const getbuttons = document.querySelectorAll('.card-alternatives_buttons button');
    getbuttons.forEach((button) => {
      button.style.backgroundColor = '#fff';
      button.style.color = '#000';
    });

    const currentButton = document.getElementById(event.target.id);
    currentButton.style.backgroundColor = '#07abb9';
    currentButton.style.color = '#fff';
  }

  return (
    <div className="main-page-question-student">
      <Background />

      <TimeQuestion />

      <CardAwnser 
        theme={question.tema} 
        awnser={question.pergunta} 
        imgAwnser={question.imgPergunta} 
        alternatives={question.alternativas} 
        onClickAlternative={handleClickAlternative} />
    </div>
  );
}

export default QuestionStudent;
