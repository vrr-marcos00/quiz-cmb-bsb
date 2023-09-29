import React from "react";
import './styles.css';

function Rules() {
// function Rules({socket}) {
  // Caso necessário o uso de estado
  // const [mensagemRecebida, setMensagemRecebida] = useState('');

  // Caso necessário o uso de useEffect()
  // useEffect(() => {
  //   Configure um ouvinte para um evento Socket.io quando o componente é montado
  //   socket.on('eventoExemplo', (data) => {
  //     setMensagemRecebida(data.mensagem);
  //   });
  // }, [socket]);

  // Direciona para a primeira pergunta
  // const handleIniteGame = () => {
  //   socket.emit('initQuiz');
  //   // Acho que deveria trocar por history()
  //   window.location.href = '/question/presenter';
  // }

  return (
    <div className="main-page-rules">
      <div className="divPai">
        <h1>Regras</h1>

        <p>1 - Os participantes deverão responder as perguntas onde cada pergunta terá 5 opções de resposta.</p>
        <p>2 - É possível trocar de alternativas até o final do tempo da pergunta. Quando o tempo acabar a última alternativa selecionada é que será contabilizada.</p>
        <p>3 - A dupla perderá 10 pontos em ambos os casos:</p>
            <li><strong>a.</strong> Errar a alternativa correta</li>
            <li><strong>b.</strong> Não responder/selecionar uma das opções dentro do tempo limite</li>
        <p>4 - O jogo será composto de 3 fases:
            <li><strong>1ª fase:</strong> perguntas fáceis com duração de 20 minutos onde cada acerto contabilizará 10 pontos.</li>
            <li><strong>2ª fase:</strong> perguntas médias com duração de 40 minutos onde cada acerto contabilizará 20 pontos.</li>
            <li><strong>3ª fase:</strong> perguntas difíceis com duração de 20 minutos onde cada acerto contabilizará 30 pontos.</li></p>
        <p>5 - As perguntas serão apresentadas e, quando o apresentador der a autorização, todos os participantes poderão responder.</p>
        <p>6 - A partir da autorização de resposta os participantes terão 30 segundos para responder cada questão.</p>
        <p>7 - Serão premiados os participantes que, ao final da disputa, obtiverem a maior pontuação.</p>
        <p>8 - Não haverá possibilidade de recurso de gabarito durante a competição.</p>
        <p>9 - Todos participantes começarão com 10 pontos.</p>
        
        <button
          className="button-init-game"
          // onClick=
        >
          Iniciar
        </button>
      </div>
    </div>
  );
};

export default Rules;
