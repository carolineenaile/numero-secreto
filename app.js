let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function gerarNumero() {
    let numeroSorteado = parseInt(Math.random() * numeroMaximo + 1);
    let qtdElementosLista = listaNumerosSorteados.length;

    if(qtdElementosLista == numeroMaximo) {
        listaNumerosSorteados = [];
    }
    
    if(listaNumerosSorteados.includes(numeroSorteado)) {
        return gerarNumero();
    } else {
        listaNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

function exibirTexto(tag, texto) {
    let nome = document.querySelector(tag);
    nome.textContent = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.1});
}

function mensagemInicial() {
    exibirTexto("h1", "Descubra o número secreto");
    exibirTexto("p", "Escolha um número entre 1 e 10:");
}

mensagemInicial();

function limparInput() {
    chute = document.querySelector('input').value = "";
    document.querySelector('input').focus();
}

limparInput();

function verificarChute() {
    let chute = document.querySelector('input').value;

    switch (true) {
        case chute == numeroSecreto:
            exibirTexto("h1", "Acertou, parabéns!");
            exibirTexto("p", `uhul, você descobriu o número secreto na ${tentativas}ª tentativa.`);
            document.getElementById('reiniciar').disabled = false;
            document.getElementById('chutar').disabled = true;
            break;
        case chute < numeroSecreto:
            chute > 0 ? tentativas++ : tentativas;
            limparInput();
            exibirTexto("p", "O número secreto é maior.");
            break;
        case chute > numeroSecreto:
            chute > 0 ? tentativas++ : tentativas;
            limparInput();
            exibirTexto("p", "O número secreto é menor.");
        default:
            break;
    }
}

function novoJogo() {
    mensagemInicial();
    limparInput();
    numeroSecreto = gerarNumero();
    tentativas = 1;
    document.getElementById('reiniciar').disabled = true;
    document.getElementById('chutar').disabled = false;
}

document.querySelector('input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        verificarChute();
    }
});