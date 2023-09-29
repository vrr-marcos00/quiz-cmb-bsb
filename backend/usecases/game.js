const phasesConfig = require("../database/phases_config.json");

// Armazena fase e questão atual
let currentPhase = {};
let currentQuestion = {};

// Armazena o estado da pontuação jogo para cada cliente
let clientGameState = {};

// Objeto para rastrear as salas
const room = require("../database/room.json") || { roomCode: "", users: [] };

/* ---------------------------------- GAME POINTS CONTROL ---------------------------------- */

// Respostas da pergunta atual, é um mapa = { [socketId]: { answerId: 0 } }
let usersCurrentAnswers = {};

function updateUserAnswer({ socketID, answerId }) {
  usersCurrentAnswers[socketID] = {
    answerId,
  };
}

function calculatePointsAndRestartUsersCurrentAnswers() {
  for (const key in usersCurrentAnswers) {
    const currentAnswer = usersCurrentAnswers[key];
    const isAnswerCorrect =
      currentAnswer.answerId === currentQuestion.correct_answer_id;
    const points = isAnswerCorrect
      ? currentPhase.points_to_earn
      : -currentPhase.points_to_lose;
    clientGameState[key].points = clientGameState[key].points + points;
  }

  usersCurrentAnswers = {};
}

/* ---------------------------------- GAME FLUX CONTROL ---------------------------------- */

function __createClientGameStateFromRoom() {
  clientGameState = room.users.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.socketId]: {
        ...currentValue,
        points: 10,
      },
    }),
    {}
  );
}

function initQuiz() {
  __createClientGameStateFromRoom();
  const easyPhase = phasesConfig.easy;
  const { questions, ...phaseConfig } = easyPhase;

  const [nextQuestion, ...remainingQuestions] = questions;
  currentPhase = {
    level: "easy",
    ...phaseConfig,
    questions: remainingQuestions,
  };

  currentQuestion = nextQuestion;

  return { nextQuestion, level: "easy" };
}

function setNextQuestion() {
  const { questions, ...phaseConfig } = currentPhase;

  if (questions.lenght === 0) {
    currentQuestion = null;
    return;
  }

  const [nextQuestion, ...remainingQuestions] = questions;
  currentPhase = {
    ...phaseConfig,
    questions: remainingQuestions,
  };

  currentQuestion = nextQuestion;
}

function updateToNextLevel() {
  const nextLevel = currentPhase.next_level;

  if (nextLevel === "finish") {
    return { finishedGame: true };
  }

  const nextLevelConfig = phasesConfig[currentPhase.next_level];
  currentPhase = {
    level: currentPhase.next_level,
    ...nextLevelConfig,
  };
  currentQuestion = {};

  return { finishedGame: false };
}

/* ---------------------------------- GETTERS ---------------------------------- */

function getCurrentQuestion() {
  return currentQuestion;
}

function getCurrentPhase() {
  return currentPhase;
}

function getClientGameState() {
  return clientGameState;
}

function getCurrentUserAnswer(socketId) {
  return usersCurrentAnswers[socketId];
}

module.exports = {
  // Game Points Control
  calculatePointsAndRestartUsersCurrentAnswers,
  updateUserAnswer,

  // Game Flux Control
  initQuiz,
  setNextQuestion,
  updateToNextLevel,

  // Getters
  getCurrentQuestion,
  getCurrentPhase,
  getClientGameState,
  getCurrentUserAnswer,
};
