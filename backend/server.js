const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const fs = require("fs");
const path = require("path");

const questions = require("./database/questions.json");

const {
  setNextQuestion,
  getCurrentQuestion,
  getCurrentPhase,
  updateToNextLevel,
  getClientGameState,
  calculatePointsAndRestartUsersCurrentAnswers,
  updateUserAnswer,
  getCurrentUserAnswer,
  initQuiz,
} = require("./usecases/game.js");

// Cria o aplicativo Express e o servidor HTTP
const app = express();
const server = http.createServer(app);

// Cria o servidor Socket.io e associe-o ao servidor HTTP
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Objeto para rastrear as respostas e pontuações dos participantes
const data = {
  participants: {},
  answeredQuestions: [],
  currentPhase: "easy",
};

const phases = ["easy", "medium", "difficult"];
let currentPhaseIndex = 0;

// Armazena o estado do jogo para cada cliente
const clientGameState = {};

// Armazena os índices das próximas perguntas a serem exibidas em cada fase
const nextQuestionIndexes = {
  easy: 0,
  medium: 0,
  difficult: 0,
};

// Objeto para rastrear as salas
const room = require("./database/room.json") || { roomCode: "", users: [] };

// Função para salvar os dados em um arquivo JSON
function saveDataToJsonFile(data) {
  const jsonData = JSON.stringify(data, null, 2);
  const filePath = path.join(__dirname, "database", "quizData.json");

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error("Erro ao salvar os dados:", err);
    } else {
      console.log("Dados salvos com sucesso em quizData.json");
    }
  });
}

function saveRoomToFile() {
  const jsonData = JSON.stringify(room, null, 2);
  const filePath = path.join(__dirname, "database", "room.json");

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error("Erro ao salvar sala:", err);
    } else {
      console.log("Sala salva com sucesso em database/room.json");
    }
  });
}

function generateRoomCode() {
  const min = 100000; // Menor número de 6 dígitos
  const max = 999999; // Maior número de 6 dígitos

  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

// Manipulador de eventos para quando um cliente se conecta
io.on("connection", (socket) => {
  clientGameState[socket.id] = { phase: "easy" };

  // Manipulador de eventos para quando um cliente se desconecta
  socket.on("disconnect", () => {
    console.log(socket.id);
    console.log("Um cliente se desconectou");
  });

  // Manipulador de eventos para desconectar um cliente quando um evento personalizado é acionado
  socket.on("forceDisconnect", () => {
    socket.disconnect();
    console.log(`Cliente desconectado: ${socket.id} - force disconnect`);
  });

  socket.on("disconnectAllUsers", () => {
    const connectedClients = io.of("/").sockets;

    if (room.users.length > 0) {
      room.users.forEach((user) => {
        const clientSocket = connectedClients.get(user.userId);
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
  socket.on("clearFileRoom", () => {
    room.roomCode = "";
    room.users = [];
    saveRoomToFile();

    socket.emit("clearFileRoomMessage", "Arquivo room limpado!");
  });

  socket.on("joinRoom", (roomCode, studentId) => {
    // Verifica se o código da sala existe
    if (roomCode === room.roomCode) {
      socket.join(roomCode);
      if (!room.users) {
        room.users = [];
        room.users.push({ userId: socket.id, studentId });
        socket.emit("studentAuthenticated", {
          userId: socket.id,
          msg: "Você foi autenticado com sucesso na sala.",
        });
      } else {
        const userIsExisting = room.users.find(
          (user) => user.userId === socket.id
        );

        const studentIdAlreadyExistis = room.users.find(
          (user) => user.studentId === studentId
        );

        if (!userIsExisting && !studentIdAlreadyExistis) {
          room.users.push({ userId: socket.id, studentId });
          // Emite um evento de sucesso para o aluno
          socket.emit("studentAuthenticated", {
            userId: socket.id,
            msg: "Você foi autenticado com sucesso na sala.",
          });
        } else if (studentIdAlreadyExistis) {
          socket.emit(
            "userIsExistingInTheRoom",
            "Você não pode entrar com essa escola, pois ela já foi escolhida."
          );
        } else if (userIsExisting) {
          socket.emit(
            "userIsExistingInTheRoom",
            "Você não pode ter dois acessos simultâneos"
          );
        }
      }
      console.log(`O estudante ${studentId} entrou na sala`);
      saveRoomToFile();

      io.emit("currentRoom", room);
    } else {
      // Emite um evento de erro para o aluno
      socket.emit("roomError", "A sala não existe ou o código está incorreto.");
    }
  });

  socket.on("authenticate", ({ role }) => {
    if (role === "presenter") {
      const roomCode = generateRoomCode();
      socket.join(roomCode);
      socket.emit("roomCode", roomCode);

      // Salva código da sala em um JSON
      room.roomCode = roomCode;
      saveRoomToFile(room);
    }
  });

  /* ---------------------------------- New Version by Breno ---------------------------------- */
  socket.on("init-quiz", () => {
    if (room.users.length > 0) {
      const { nextQuestion, level } = initQuiz();
      io.emit("show-next-question", { question: nextQuestion, level });
    } else {
      socket.emit("initGameError", "O jogo deve conter no minímo 1 jogador");
    }
  });

  socket.on("foward", () => {
    setNextQuestion();
    const question = getCurrentQuestion();

    if (question) {
      const phase = getCurrentPhase();
      io.emit("show-next-question", { question, level: phase.level });
      return;
    }

    const { finishedGame } = updateToNextLevel();

    io.emit("show-classification", {
      classification: Object.values(getClientGameState()),
      finishedGame,
    });
  });

  socket.on("show-answer", () => {
    io.emit("show-answer");
    calculatePointsAndRestartUsersCurrentAnswers();

    io.emit("updated-points", {
      classification: Object.values(getClientGameState()),
    });
  });

  socket.on("user-answer", ({ userId, answerId }) => {
    if (!getCurrentUserAnswer(userId)) {
      io.emit("user-answer-to-presenter", { id: userId });
    }
    updateUserAnswer({ userId, answerId });
  });
});

// Inicializa o servidor na porta desejada
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor Socket.io está ouvindo na porta ${PORT}`);
});
