const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const questions = require('./database/questions.json');

// Cria o aplicativo Express e o servidor HTTP
const app = express();
const server = http.createServer(app);

// Cria o servidor Socket.io e associe-o ao servidor HTTP
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


// Objeto para rastrear as respostas e pontuações dos participantes
const data = {
  participants: {},
  answeredQuestions: [],
  currentPhase: 'easy',
};

// Objeto para rastrear as salas
const room = require('./database/room.json') || { roomCode: '', users: [] };

// Listagem de clients a serem desconectados
let clientsToDisconnect = [];

// Função para salvar os dados em um arquivo JSON
function saveDataToJsonFile(data) {
  const jsonData = JSON.stringify(data, null, 2);
  const filePath = path.join(__dirname, 'database', 'quizData.json');

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados:', err);
    } else {
      console.log('Dados salvos com sucesso em quizData.json');
    }
  });
}

function saveRoomToFile() {
  const jsonData = JSON.stringify(room, null, 2);
  const filePath = path.join(__dirname, 'database', 'room.json');

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error('Erro ao salvar sala:', err);
    } else {
      console.log('Sala salva com sucesso em database/room.json');
    }
  });
}

function generateRoomCode() {
  const min = 100000; // Menor número de 6 dígitos
  const max = 999999; // Maior número de 6 dígitos

  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

// Manipulador de eventos para quando um cliente se conecta
io.on('connection', (socket) => {
  // Manipulador de eventos para quando um cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Um cliente se desconectou');
  });

  // Manipulador de eventos para desconectar um cliente quando um evento personalizado é acionado
  socket.on('forceDisconnect', () => {
    socket.disconnect();
    console.log(`Cliente desconectado: ${socket.id} - force disconnect`);
  });

  socket.on('disconnectAllUsers', () => {
    const connectedClients = io.of("/").sockets;

    if (room.users.length > 0) {
      room.users.forEach((user) => {
        const clientSocket = connectedClients.get(user.socketId);
        if (clientSocket) {
          clientSocket.disconnect();
          console.log(`Cliente desconectado: ${user.studentId}`);
        }
      });

      room.users = [];
      saveRoomToFile();
    }
  });

  // Limpa arquivo romm
  socket.on('clearFileRoom', () => {
    room.roomCode = '';
    room.users = [];
    saveRoomToFile();

    socket.emit('clearFileRoomMessage', 'Arquivo room limpado!');
  });

  // Manipulador de eventos para quando um cliente solicita uma pergunta aleatória
  socket.on('getRandomQuestion', () => {
    const currentPhaseQuestions = questions[data.currentPhase];
    
    if (currentPhaseQuestions.length === 0) {
      // Se não houver mais perguntas na fase atual, mude para a próxima fase
      switch (data.currentPhase) {
        case 'easy':
          data.currentPhase = 'medium';
          break;
        case 'medium':
          data.currentPhase = 'difficult';
          break;
        case 'difficult':
          // Todas as fases foram concluídas, você pode tratar isso como desejar
          break;
      }
    }
    
    // Obtém uma pergunta aleatória da fase atual
    const randomIndex = Math.floor(Math.random() * currentPhaseQuestions.length);
    const randomQuestion = currentPhaseQuestions[randomIndex];
    
    // Remova a pergunta da matriz para que ela não seja repetida
    currentPhaseQuestions.splice(randomIndex, 1);
    
    // Envia a pergunta aleatória para o cliente
    io.emit('question', { id: randomQuestion.id, question: randomQuestion });
  });


  socket.on('answer', ({ playerId, questionId, isCorrect }) => {
    // Verifica se o jogador já respondeu a esta pergunta
    if (!data.answeredQuestions.includes(questionId)) {
      // Adiciona o ID da pergunta à lista de perguntas respondidas
      data.answeredQuestions.push(questionId);
  
      // Verifica se o jogador está no objeto de participantes
      if (!data.participants[playerId]) {
        // Se não estiver, crie uma entrada para o jogador
        data.participants[playerId] = {
          score: 0,
        };
      }
  
      // Atualiza a pontuação do jogador com base na resposta
      if (isCorrect) {
        data.participants[playerId].score += 10;
      } else {
        data.participants[playerId].score -= 10;
      }
  
      // Salva os dados em um arquivo JSON
      saveDataToJsonFile(data);
    }
  });

  socket.on('joinRoom', (roomCode, studentId) => {
    // Verifica se o código da sala existe
    if (roomCode === room.roomCode) {
      socket.join(roomCode);
      if (!room.users) {
        room.users = [];
        room.users.push({ socketId: socket.id, studentId });
        socket.emit('studentAuthenticated', 'Você foi autenticado com sucesso na sala.');
      } else {
        const userIsExisting = room.users.find((user) => user.socketId === socket.id);
  
        if (!userIsExisting) {
          room.users.push({ socketId: socket.id, studentId });
          // Emite um evento de sucesso para o aluno
          socket.emit('studentAuthenticated', 'Você foi autenticado com sucesso na sala.');
        } else {
          socket.emit('userIsExistingInTheRoom', 'Você não pode ter dois acessos simultâneos');
        }
      }
      console.log(`O estudante ${studentId} entrou na sala`);
      saveRoomToFile();
  
      io.emit('currentRoom', room);
    } else {
      // Emite um evento de erro para o aluno
      socket.emit('roomError', 'A sala não existe ou o código está incorreto.');
    }
  });

  socket.on('authenticate', ({ role }) => {
    if (role === 'presenter') {
      const roomCode = generateRoomCode();
      socket.join(roomCode);
      socket.emit('roomCode', roomCode);
  
      // Salva código da sala em um JSON
      room.roomCode = roomCode;
      saveRoomToFile(room);
    }
  });

  socket.on('initQuiz', () => {
    if (room.users.length > 0) {
      io.emit('initGame', true);
    } else {
      socket.emit('initGameError', 'O jogo deve conter no minímo 1 jogador');
    }
    
  })
});
  

// Inicializa o servidor na porta desejada
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor Socket.io está ouvindo na porta ${PORT}`);
});
