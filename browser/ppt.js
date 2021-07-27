/*-----------------------------------------------------(Código Antigo 23/07/2021)------------------------------------------------------------------ 
let scoreJogador = 0;
let scoreComputador = 0;
const botoes = document.querySelectorAll('input');

function jogoComputador()
{
    let escolhas = ['pedra', 'papel', 'tesoura'];
    return escolhas[Math.floor(Math.random() * escolhas.length)];
}

function desabilitaBotoes()
{
    botoes.forEach(elemento => {elemento.disabled = true});
}

function executarRound(selecaoJogador)
{
    let selecaoComputador = jogoComputador();
    let resultado = "";

    if((selecaoJogador == 'pedra' && selecaoComputador == 'tesoura') || (selecaoJogador == 'tesoura' && selecaoComputador == 'papel') || (selecaoJogador == 'papel' && selecaoComputador == 'pedra'))
    {
        scoreJogador++;
        resultado = ('Você ganhou! ' + selecaoJogador + ' derrota ' + selecaoComputador + 
        "<br><br>Score do Jogador: " + scoreJogador + "<br>Score do Computador: " + scoreComputador);

        if(scoreJogador == 5)
        {
            resultado += '<br><br>Você venceu o jogo! Recarregue a página novamente para jogar.';
            desabilitaBotoes();
        }
    }

    else if(selecaoJogador == selecaoComputador)
    {
        resultado = ('Houve um empate! Você e o Computador escolheram a mesma coisa: ' + selecaoJogador + 
        "<br><br>Score do Jogador: " + scoreJogador + "<br>Score do Computador: " + scoreComputador);
    }

    else
    {
        scoreComputador++;
        resultado = ('Você perdeu! ' + selecaoComputador + ' derrota ' + selecaoJogador + 
        "<br><br>Score do Jogador: " + scoreJogador + "<br>Score do Computador: " + scoreComputador);

        if(scoreComputador == 5)
        {
            resultado = '<br><br>Computador venceu o jogo! Recarregue a página novamente para jogar.';
            desabilitaBotoes();
        }
    }

    document.getElementById('resultado').innerHTML = resultado;
}

botoes.forEach(botao => {botao.addEventListener('click', function(){executarRound(botao.value)})});
--------------------------------------------------------------------------------------------------------------------------------------------------*/

let scoreJogador = 0;
let scoreComputador = 0;
let paraCabecalhoPontuacao = "";

const simboloBotoes = document.querySelectorAll(".btn");
simboloBotoes.forEach((button) => button.addEventListener("click", jogarRound));

// Inicia toda a logica de jogo e apresenta mensagem final de jogo.
function jogarRound(event) 
{
    let botaoId;

    if(jogoFinalizado())
    {
        alert("Fim do jogo! Aperte F5 para jogar novamente.");
        return;
    }

    if(event.target.tagName.toLowerCase() === "i")
    {
        // Pega o string do id do nó pai (button)
        botaoId = event.target.parentNode.id;
        //converterSimboloIdMaiusculo(botaoId);
        //alert("O id do botão clicado é: " + botaoId);
    }
    else
    {
        botaoId = event.target.id;
    }

    const selecaoJogador = converterSimboloIdMaiusculo(botaoId);
    const selecaoComputador = pegarEscolhaRandomica();
    atualizarPontucao(obterVencedor(selecaoJogador, selecaoComputador));
    atualizarEscolhas(selecaoJogador, selecaoComputador);
}

// Retorna vitória da seleção do Jogador, do Computador ou empate.
function obterVencedor(selecaoJogador, selecaoComputador)
{
    if(selecaoJogador === selecaoComputador)
    {
        return "empatado"
    }

    if(selecaoJogador === "ROCK" && selecaoComputador === "SCISSORS" || (selecaoJogador === "SCISSORS" && selecaoComputador ==="PAPER" || (selecaoJogador === "PAPER" && selecaoComputador === "ROCK")))
    {
        return "jogador";
    }

    if(selecaoComputador === "ROCK" && selecaoJogador === "SCISSORS" || (selecaoComputador === "SCISSORS" && selecaoJogador ==="PAPER" || (selecaoComputador === "PAPER" && selecaoJogador === "ROCK")))
    {
        return "computador";
    }
}

// Atualiza as escolhas do Jogador e do Computador e as exibe nos elementos de HTML.
function atualizarEscolhas(selecaoJogador, selecaoComputador)
{
    const simboloJogador = document.getElementById("simbolo-jogador");
    const simboloComputador = document.getElementById("simbolo-computador");

    simboloJogador.classList.add("active");
    simboloComputador.classList.add("active");

    const nomeClasseSimboloJogador = `fa-hand-${selecaoJogador.toLowerCase()}`;
    console.log(nomeClasseSimboloJogador);
    const nomeClasseSimboloComputador = `fa-hand-${selecaoComputador.toLowerCase()}`;
    console.log(nomeClasseSimboloComputador);

    simboloJogador.classList = `fas ${nomeClasseSimboloJogador} active`;
    simboloComputador.classList = `fas ${nomeClasseSimboloComputador} active`;
}

// Atualiza pontuação no elemento h2 de HTML.
function atualizarPontucao(vencedor)
{
    paraCabecalhoPontuacao = document.getElementById("pontuacao-cabecalho");
    const paraPontuacaoJogador = document.getElementById("placar-jogador");
    const paraPontuacaoComputador = document.getElementById("placar-computador");

    if(vencedor === "empatado")
    {
        paraCabecalhoPontuacao.textContent = "Deu empate!";
    }
    else if(vencedor === "jogador")
    {
        paraCabecalhoPontuacao.textContent = "Você venceu!";
        scoreJogador++;
    }
    else if(vencedor === "computador")
    {
        paraCabecalhoPontuacao.textContent = "Você perdeu!";
        scoreComputador++;
    }

    paraPontuacaoJogador.textContent = `Jogador: ${scoreJogador}`;
    paraPontuacaoComputador.textContent = `Computador: ${scoreComputador}`;

    if(jogoFinalizado())
    {
        definirMensagemFinal();
    }
}

// Define mensagem final para o fim de jogo.
function definirMensagemFinal()
{
    return scoreJogador > scoreComputador 
    ? (paraCabecalhoPontuacao.textContent = "GameOver, Você Venceu!") 
    : (paraCabecalhoPontuacao.textContent = "GameOver, Você Perdeu!");
}

// Converte string do id do elemento HTML em minúsculo para maiúsculo.
function converterSimboloIdMaiusculo(botaoId)
{
    // Pega o primeiro indice '0' do Id do botão separado por '-' e transforma em Maiúsculo.
    //let stringMaiusculo = botaoId.split("-")[0].toUpperCase();
    //alert("String do id do botão para maiúsculo: " + stringMaiusculo);
    return botaoId.split("-")[0].toUpperCase();
}

function jogoFinalizado()
{
    return scoreJogador === 5 || scoreComputador === 5;
}

// Executa uma escolha randômica e a exibe como escolha do Computador.
function pegarEscolhaRandomica() 
{
    let numeroRandomico = Math.floor(Math.random() * simboloBotoes.length);

    switch(numeroRandomico)
    {
        case 0:
            return "ROCK";
        case 1:
            return "PAPER";
        case 2:
            return "SCISSORS";
    }
}


