let selecaoJogador = "";

// Chama o jogo na janela de prompt.
jogo();

// Função que fará o Computador jogar.
function jogoComputador() 
{
    let escolhas = ['pedra', 'papel', 'tesoura'];
    return escolhas[Math.floor(Math.random() * escolhas.length)];
}

// Função que compara os valores de Jogador e Computador e exibe uma mensagem adequadamente.
function executarRound(selecaoJogador, selecaoComputador)
{
    let pontosJogador = 0;

    if((selecaoJogador == 'pedra' && selecaoComputador == 'tesoura') || (selecaoJogador == 'tesoura' && selecaoComputador == 'papel') || (selecaoJogador == 'papel' && selecaoComputador == 'pedra'))
    {
        pontosJogador++;
        console.log('Você ganhou! ' + selecaoJogador + ' derrota ' + selecaoComputador);
    }
    else
    {
        console.log('Você perdeu! ' + selecaoComputador + ' derrota ' + selecaoJogador);
    }
    return pontosJogador;
}

function jogo(totalRounds = 5)
{
    let roundsJogados = 0;
    let scoreJogador = 0;

    while(roundsJogados < totalRounds)
    {
        // Pega a seleção do Jogador no prompt.
        selecaoJogador = prompt('pedra, papel ou tesoura?');

        if(selecaoJogador != null)
        {
            // Transforma toda a string em minúsculo.
            selecaoJogador = selecaoJogador.toLowerCase();
        }
        else
        {
            break;
        }

        if((selecaoJogador != 'pedra') && (selecaoJogador != 'papel') && (selecaoJogador != 'tesoura') || (selecaoJogador == ""))
        {
            continue;
        }

        // Pega a seleção do Computador.
        let selecaoComputador = jogoComputador();

        if(selecaoJogador == selecaoComputador)
        {
            console.log('Deu empate! Você e o Computador escolheram a mesma coisa: ' + selecaoJogador);
            continue;
        }

        scoreJogador += executarRound(selecaoJogador, selecaoComputador);
        roundsJogados++;
    }

    // Verifica se o Jogador tem um número maior de score que os rounds jogados.
    if(scoreJogador > (roundsJogados / 2) && selecaoJogador != null)
    {
        console.log('Você ganhou! ' + scoreJogador + ' de ' + roundsJogados + ' rounds. Você venceu!');
    }

    // Verifica se o Jogador tem o mesmo número de score que rounds jogados.
    else if(scoreJogador == (roundsJogados / 2) && selecaoJogador != null)
    {
        console.log('Você ganhou ' + scoreJogador + ' de ' + roundsJogados + ' rounds. Você empatou.');
    }

    else if(selecaoJogador != null)
    {
        console.log('Você ganhou ' + scoreJogador + ' de ' + roundsJogados + ' rounds. Você perdeu!');
    }
}