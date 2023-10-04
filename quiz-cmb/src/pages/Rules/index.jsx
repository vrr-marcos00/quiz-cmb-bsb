import React from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

function Rules({socket}) {
  const navigate = useNavigate();

  React.useEffect(() => {
    socket.on("show-next-question", ({ question, level }) => {
      localStorage.setItem(
        "currentQuestion",
        JSON.stringify({ question, level })
      );

      localStorage.setItem("isPresenter", true);
    });
  }, []);

  const handleInitGame = () => {
    navigate("/question/presenter");
  };

  return (
    <div className="main-page-rules">
      <div className="divPai">
        <h1>Regras</h1>

        <p>1 - Os participantes deverão responder às perguntas escolhendo uma das 5 opções de resposta disponíveis.</p>
        <p>2 - É possível trocar de alternativa até o final do tempo da pergunta. Quando o tempo acabar a última alternativa selecionada é que será contabilizada.</p>
        <p>3 - As perguntas serão apresentadas e, quando o apresentador der a autorização, todos os participantes poderão responder.</p>
        <p>4 - A partir da autorização de resposta os participantes terão 30 segundos para responder cada questão.</p>
        <p>5 - Todos os participantes começarão com 10 pontos.</p>
        <p>6 - Os participantes não pontuarão nos seguintes casos:</p>
            <li><strong>a.</strong> Errar a alternativa correta.</li>
            <li><strong>b.</strong> Não responder/selecionar uma das opções dentro do tempo limite.</li>
        <p>7 - O jogo será composto de 3 fases:
            <li><strong>1ª fase:</strong> perguntas fáceis com duração de 20 minutos onde cada acerto contabilizará 10 pontos.</li>
            <li><strong>2ª fase:</strong> perguntas médias com duração de 40 minutos onde cada acerto contabilizará 20 pontos.</li>
            <li><strong>3ª fase:</strong> perguntas difíceis com duração de 20 minutos onde cada acerto contabilizará 30 pontos.</li></p>
        <p>8 - Apenas os três primeiros colocados se classificarão para a última fase.</p>
        <p>9 - Em caso de empate na quantidade de pontos o critério de desempate será o menor tempo de resposta.</p>
        <p>10 - Para a disputa da última fase a pontuação dos classificados será zerada.</p>
        <p>11 - Vencerão os participantes que, ao final da disputa, obtiverem a maior pontuação e, em caso de empate, o menor tempo de resposta.</p>
        
        <button onClick={handleInitGame}>
          Iniciar Game
        </button>
      </div>
    </div>
  );
};

export default Rules;
