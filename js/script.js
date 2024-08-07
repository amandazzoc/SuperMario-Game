//import {getBanco, setBanco, bancoTemp} from './conexao.js';
import * as conexoes from './conexao.js';
import * as modulos from './modulos.js';

// Elementos GLobais
const inputJogador = document.querySelector('#inputJogador');
const btnStart = document.querySelector('#btnStart');
const modalLogin = document.querySelector('#modalLogin');
const modalGameOver = document.querySelector('#modalGameOver')
const modal = document.querySelector('#modal');
const txtNomeJogador = document.querySelector('#txtNomeJogador');
const sleep = document.querySelector('#sleep');
const txtSleep = document.querySelector('#txtSleep');
const cenario = document.querySelector('#cenario');
const txtTempo = document.querySelector('#txtTempo');
const imgTubo = document.querySelector('#imgTubo');
const imgBomba = document.querySelector('#imgBomba');
const imgMoedas = document.querySelectorAll('#imgCoin');
const imgEstrelas = document.querySelectorAll('#imgStar');
// Esses all é como se fosse um let lista = [item1, item2, item3];
const txtMoedas = document.querySelector('#txtMoedas');
const txtEstrelas = document.querySelector('#txtEstrelas');
const btnReiniciar = document.queryCommandEnabled('#btnReiniciar');


// Variaveis globais
let nomeJogador;
let moedasJogador = 0;
let estrelasJogador = 0;
let tempoJogador = 0;
let pontuacaoJogador = 0;

let loopSleep;
let loopTime;
let loopMoverElementos;
let loopPegarElementos;
let loopControlePartida;

// Funções

const validarJogador = ({target}) => {

    if(target.value.length > 2 && target.value.length <= 12){
        btnStart.removeAttribute('disabled');

        // Trim para tirar os espaços e UpperCase para deixar tudo em caixa alta
        nomeJogador = target.value.trim().toUpperCase();

        btnStart.addEventListener('click', start);

        document.addEventListener('keypress', ({key}) => {
            if(key === 'Enter' && target.value.length > 2) {
                start();
            }
        });
    }else{
        btnStart.setAttribute('disabled', 'true');
    }
};

const iniciarJogo = () => {
    // modulos.playSom('somAbertura');
    inputJogador.addEventListener('input', validarJogador);
};
iniciarJogo();

const start = () =>{
    modulos.limparTexto();
    modulos.stopSom('somAbertura');
    modulos.playSom('somPrincipal');
    document.addEventListener('keydown', modulos.pular);
    document.addEventListener('keydown', modulos.voar);
    document.addEventListener('keydown', modulos.abaixar);
    document.addEventListener('keyup', modulos.levantar);

    modal.classList.remove('habilitar');
    modalLogin.classList.remove('active');
    txtNomeJogador.innerHTML = nomeJogador;

    sleep.classList.add('active');

    // Intervalo, ele vai ler tudo o que está dentro da função, aguardar o loop e ler tudo de novo
    loopSleep = setInterval(() => {
        let cont = txtSleep.innerHTML; //5
        cont--;
        txtSleep.innerHTML = cont;
    }, 1000);
    
    setTimeout(() => {
        sleep.classList.remove('active'); // Remove o Sleep
        cenario.classList.add('start'); // Inicia o jogo
        clearInterval(loopSleep); // Para de contar o tempo do sleep
        modulos.imgMario.src = './img/mario.gif'; // Troca a imagem do mario
        time(); // Começa  função time
        
        moverElementos(imgTubo);
        moverElementos(imgBomba, 1.5);

        pegarElementos();
        controlePartida();

        
        
    }, 6000);
};

const time = () => {
    loopTime = setInterval(() => {
        tempoJogador = txtTempo.innerHTML; //00
        tempoJogador ++; //1
        txtTempo.innerHTML = tempoJogador; //1
    }, 1000);
};

const moverElementos = (elemento, retardo = 0) => {
    loopMoverElementos = setInterval(() => {
        if(tempoJogador <= 20) {
            elemento.style.animation = `move-elementos 3s infinite linear ${retardo}s`;
        } 
        // else if (tempoJogador <= 30) {
        //     elemento.style.animation = `move-elementos 2.5s infinite linear ${retardo}s`;
        // } else if (tempoJogador <= 40) {
        //     elemento.style.animation = `move-elementos 2s infinite linear ${retardo}s`;
        // } else if (tempoJogador <= 50) {
        //     elemento.style.animation = `move-elementos 1.2s infinite linear ${retardo}s`;
        // }
    }, 1);
};

const pegarElementos = () => {
    loopPegarElementos = setInterval(() => {
        let posicaoMarioBottom = window.getComputedStyle(modulos.imgMario).bottom.replace('px', '');

        let posicaoMarioTop = modulos.imgMario.offsetTop;
        // Chamar elemento, passa no forEach, dois parametros, um é o elemento e o outro a posição do elemento
        imgMoedas.forEach((item, index) =>{
            let posicaoMoedaLeft = item.offsetLeft;

            if(posicaoMarioBottom >= 170 && posicaoMarioBottom <= 200 && posicaoMoedaLeft <= 150){
                moedasJogador++;

                txtMoedas.innerHTML = moedasJogador;

                item.style.display = 'none';

                modulos.playSom('somMoeda');

                setTimeout(() => {
                    item.style.display = 'block';
                }, 100);
            }
            
        });

        imgEstrelas.forEach((item, index) => {
            let posicaoEstrelaLeft = item.offsetLeft;

            if(posicaoMarioTop <= 250 && posicaoMarioTop >= 120 && posicaoEstrelaLeft <= 350 && posicaoEstrelaLeft >= 200){
                estrelasJogador++;

                txtEstrelas.innerHTML = estrelasJogador;

                item.style.display = 'none';

                modulos.playSom('somEstrela');

                setTimeout(() => {
                    item.style.display = 'block';
                }, 100);
            }
        });

    }, 250);
};

const controlePartida = () => {
    loopControlePartida = setInterval(() => {
        const posicaoTuboLeft = imgTubo.offsetLeft;
        const posicaoBombaLeft = imgBomba.offsetLeft;
        const alturaMario = modulos.imgMario.offsetHeight; // Corrigido para offsetHeight
        const posicaoMarioBottom = parseFloat(window.getComputedStyle(modulos.imgMario).bottom.replace('px', ''));

        console.log(`posicaoTuboLeft: ${posicaoTuboLeft}, posicaoBombaLeft: ${posicaoBombaLeft}, alturaMario: ${alturaMario}, posicaoMarioBottom: ${posicaoMarioBottom}`);

        if(posicaoTuboLeft <= 130 && posicaoTuboLeft > 50 && posicaoMarioBottom <= 100){
            imgTubo.style.animation = 'none';
            imgTubo.style.left = `${posicaoTuboLeft}px`;

            modulos.imgMario.style.animation = 'none';
            modulos.imgMario.style.bottom = `${posicaoMarioBottom}px`;

            modulos.imgMario.src = './img/mario-game-over.png';
            modulos.imgMario.style.width = '73px';
            modulos.imgMario.style.left = '60px';

            document.removeEventListener('keydown', modulos.pular);
            document.removeEventListener('keydown', modulos.voar);
            document.removeEventListener('keydown', modulos.abaixar);
            document.removeEventListener('keyup', modulos.levantar);

            clearInterval(loopControlePartida);

            gameOver();

        }

        if(posicaoBombaLeft <= 110 && posicaoBombaLeft >= 50 && posicaoMarioBottom <= 180 && alturaMario >= 100){
            imgBomba.style.animation = 'none';
            imgBomba.style.left = `${posicaoBombaLeft}px`;

            modulos.imgMario.style.animation = 'none';
            
            if(posicaoMarioBottom <= 10){
                modulos.imgMario.style.bottom = '30px';
            }else {
               modulos.imgMario.style.bottom = `${posicaoMarioBottom}px`;
            }

            modulos.imgMario.src = './img/mario-game-over.png';
            modulos.imgMario.style.width = '73px';
            modulos.imgMario.style.left = '60px';

            document.removeEventListener('keydown', modulos.pular);
            document.removeEventListener('keydown', modulos.voar);
            document.removeEventListener('keydown', modulos.abaixar);
            document.removeEventListener('keyup', modulos.levantar);

            clearInterval(loopControlePartida);

            gameOver();
        }
    }, 1);
}

const calcularPontuacao = () => {
    pontuacaoJogador = (moedasJogador * 2) + (estrelasJogador * 5) + tempoJogador;
    
};

const gameOver = () => {

    modulos.stopSom('somPrincipal');
    modulos.playSom('somPerdeu');

    clearInterval(loopPegarElementos);
    clearInterval(loopTime);
    clearInterval(loopMoverElementos);

    calcularPontuacao();

    conexoes.bancoTemp(nomeJogador, moedasJogador, estrelasJogador, tempoJogador, pontuacaoJogador);

    modal.classList.add('habilitar');
    modalGameOver.classList.add('active');
}

const reiniciarPartida = () => {
    modulos.playSom('somAbertura');
    location.reload(true);
}

btnReiniciar.forEach((btn) => {
    btn.addEventListener('click', reiniciarPartida);
});

const telaRanking = () => {
    
}