let listaDeChutes = [];
let limite = 10
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}
exibirTituloJogo();
function exibirTituloJogo(){
    exibirTextoNaTela('h1', 'Acerte os numeros');
    exibirTextoNaTela('p', 'Tente acertar o numero entre 0 e 10');
}


function verificarChute(){
    let chute = document.querySelector('input').value;
        
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou');
       let palavraTentativas = tentativas > 1 ? 'Tentativas' : 'Tentativa';
       let mensagem = `Você descobriu em ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1', 'Você errou');
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O numero secreto é menor');
        }else {
            exibirTextoNaTela('p','O numero secreto é maior')
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * limite + 1);
    let qtdNumerosLista = listaDeChutes.length;

    if(qtdNumerosLista == limite){
        listaDeChutes = [];
    }

    if(listaDeChutes.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeChutes.push(numeroEscolhido);
        console.log(listaDeChutes);
        return numeroEscolhido
    }
}

function limparCampo(){
    document.querySelector('input').value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTituloJogo();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}