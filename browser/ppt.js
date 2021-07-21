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

