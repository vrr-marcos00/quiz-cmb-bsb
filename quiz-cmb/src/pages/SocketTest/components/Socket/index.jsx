import React, { Component } from 'react';
import io from 'socket.io-client';

class Socket extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };

    // Conecte-se ao servidor Socket.io
    this.socket = io('http://localhost:4000'); // Substitua pela URL do seu servidor
  }

  componentDidMount() {
    // Evento de conexão
    this.socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.io');
    });

    // Evento personalizado - receber uma mensagem do servidor
    this.socket.on('chat message', (message) => {
      console.log(`Mensagem recebida do servidor: ${message}`);
      this.setState({ message });
    });
  }

  sendMessage = () => {
    const message = prompt('Digite uma mensagem:');
    // Emitir uma mensagem para o servidor
    this.socket.emit('chat message', message);
  };

  render() {
    return (
      <div>
        <h1>Cliente de Teste Socket.io com React</h1>
        <button onClick={this.sendMessage}>Enviar Mensagem</button>
        <div>Mensagem Recebida do Servidor: {this.state.message}</div>
      </div>
    );
  }
}

export default Socket;
