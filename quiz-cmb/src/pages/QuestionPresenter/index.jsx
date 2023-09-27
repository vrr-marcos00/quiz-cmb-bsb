import React from 'react';
import './styles.css';

/**
 * Configs
 */
import { URL_SOCKET } from '../../configs';
import io from 'socket.io-client';

/**
 * Components
 */
import Time from './components/Time/Index';
import ContainerButtons from './components/ContainerButtons';
import ContainerQuestions from './components/ContainerQuestions';
import ContainerTitle from './components/ContainerTitle';
import ContainerStudents from './components/ContainerStudents';

const socket = io(URL_SOCKET);

function QuestionPresenter() {
  const [question, setQuestion] = React.useState({});
  const [currentPhase, setCurrentPhase] = React.useState('easy');

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
    <div className="main-page-question-presenter">
      <Time />
  
      <div className="main-page_container">
        <div className="row-main">
          <ContainerTitle title={question.tema} />
          
          <ContainerQuestions question={question} />

          <ContainerStudents students={[]} />

          <ContainerButtons 
            handleNextQuestion={handleNextQuestion} 
            handleStartTimer={handleNextQuestion} 
            handleShowQuestion={handleNextQuestion} 
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionPresenter;
