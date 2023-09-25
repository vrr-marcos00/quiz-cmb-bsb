const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const questions = require('./utils/questions.json');

// Crie o aplicativo Express e o servidor HTTP
const app = express();
const server = http.createServer(app);

// Crie o servidor Socket.io e associe-o ao servidor HTTP
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Troque pela URL do seu aplicativo React
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


// Objeto para rastrear as respostas e pontuações dos participantes
const data = {
  participants: {},
  answeredQuestions: [],
  currentPhase: 'facil',
};

// Manipulador de eventos para quando um cliente se conecta
io.on('connection', (socket) => {
  console.log('Um cliente se conectou');

  // Manipulador de eventos para quando um cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Um cliente se desconectou');
  });

  // Manipulador de eventos personalizados
  socket.on('chat message', (message) => {
    console.log(`Mensagem recebida: ${message}`);
    // Emitir a mensagem para todos os clientes conectados
    io.emit('chat message', message);
  });

  // Manipulador de eventos para quando um cliente solicita uma pergunta aleatória
  socket.on('getRandomQuestion', () => {
    const currentPhaseQuestions = questions[data.currentPhase];
    
    if (currentPhaseQuestions.length === 0) {
      // Se não houver mais perguntas na fase atual, mude para a próxima fase
      switch (data.currentPhase) {
        case 'facil':
          data.currentPhase = 'medio';
          break;
        case 'medio':
          data.currentPhase = 'dificil';
          break;
        case 'dificil':
          // Todas as fases foram concluídas, você pode tratar isso como desejar
          break;
      }
    }
    
    // Obtém uma pergunta aleatória da fase atual
    const randomIndex = Math.floor(Math.random() * currentPhaseQuestions.length);
    const randomQuestion = currentPhaseQuestions[randomIndex];
    
    // Remove a pergunta da matriz para que ela não seja repetida
    currentPhaseQuestions.splice(randomIndex, 1);
    
    // Gere um ID único para a pergunta
    const questionId = uuidv4();
    
    // Envie a pergunta aleatória para o cliente
    socket.emit('question', { id: questionId, question: randomQuestion });
  });


  socket.on('answer', ({ playerId, questionId, isCorrect }) => {
    // Verifique se o jogador já respondeu a esta pergunta
    if (!data.answeredQuestions.includes(questionId)) {
      // Adicione a ID da pergunta à lista de perguntas respondidas
      data.answeredQuestions.push(questionId);
  
      // Verifique se o jogador está no objeto de participantes
      if (!data.participants[playerId]) {
        // Se não estiver, crie uma entrada para o jogador
        data.participants[playerId] = {
          score: 0,
        };
      }
  
      // Atualize a pontuação do jogador com base na resposta
      if (isCorrect) {
        data.participants[playerId].score += 10;
      } else {
        data.participants[playerId].score -= 10;
      }
  
      // Salve os dados em um arquivo JSON
      saveDataToJsonFile(data);
    }
  });
  
  // Função para salvar os dados em um arquivo JSON
  function saveDataToJsonFile(data) {
    const jsonData = JSON.stringify(data, null, 2);
  
    fs.writeFile('quizData.json', jsonData, (err) => {
      if (err) {
        console.error('Erro ao salvar os dados:', err);
      } else {
        console.log('Dados salvos com sucesso em quizData.json');
      }
    });
  }
});

// Inicialize o servidor na porta desejada
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor Socket.io está ouvindo na porta ${PORT}`);
});


