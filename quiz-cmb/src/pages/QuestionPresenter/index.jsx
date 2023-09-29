import React from 'react';
import './styles.css';

/**
 * Components
 */
import Time from './components/Time/Index';
import ContainerButtons from './components/ContainerButtons';
import ContainerQuestions from './components/ContainerQuestions';
import ContainerTitle from './components/ContainerTitle';
import ContainerStudents from './components/ContainerStudents';

function QuestionPresenter({ socket }) {
  const [question, setQuestion] = React.useState({});
  const [currentPhase, setCurrentPhase] = React.useState('easy');

  React.useEffect(() => {
    socket.emit('start-game');
    socket.on('question', (data) => {
      setQuestion(data);
    });
  }, []);
  // }, [socket]);

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
