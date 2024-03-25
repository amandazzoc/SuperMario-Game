//import {getBanco, setBanco, bancoTemp} from './conexao.js';
import * as conexoes from './conexao.js';
import * as modulos from './modulos.js';

// Elementos GLobais
const inputJogador = document.querySelector('#inputJogador');
const btnStart = document.querySelector('#btnStart');
const modalLogin = document.querySelector('#modalLogin');
const modal = document.querySelector('#modal');
const txtNomeJogador = document.querySelector('#txtNomeJogador');
const sleep = document.querySelector('#sleep');
const txtSleep = document.querySelector('#txtSleep');
const cenario = document.querySelector('#cenario');
const txtTempo = document.querySelector('#txtTempo');
const imgCano = document.querySelector('#imgCano');
const imgBomba = document.querySelector('#imgBomba');
const imgMoedas = document.querySelectorAll('#imgCoin');
const imgEstrelas = document.querySelectorAll('#imgStar');
// Esses all é como se fosse um let lista = [item1, item2, item3];
const txtMoedas = document.querySelector('#txtMoedas');


// Variaveis globais
let nomeJogador;
let moedasJogador = 0;
let estrelasJogador = 0;
let tempoJogador = 0;
let pontuacaoJogador = 0;

let tempoTime;
let tempoMoverElementos;
let tempoPegarElementos;

// Funções

const validarJogador = ({target}) => {

    if(target.value.length > 2){
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
    // modulos.playSom('somPrincipal');
    document.addEventListener('keydown', modulos.pular);
    document.addEventListener('keydown', modulos.voar);
    document.addEventListener('keydown', modulos.abaixar);
    document.addEventListener('keyup', modulos.levantar);

    modal.classList.remove('habilitar');
    modalLogin.classList.remove('active');
    txtNomeJogador.innerHTML = nomeJogador;

    sleep.classList.add('active');

    // Intervalo, ele vai ler tudo o que está dentro da função, aguardar o tempo e ler tudo de novo
    const tempoSleep = setInterval(() => {
        let cont = txtSleep.innerHTML; //5
        cont--;
        txtSleep.innerHTML = cont;
    }, 1000);
    
    setTimeout(() => {
        sleep.classList.remove('active'); // Remove o Sleep
        cenario.classList.add('start'); // Inicia o jogo
        clearInterval(tempoSleep); // Para de contar o tempo do sleep
        modulos.imgMario.src = './img/mario.gif'; // Troca a imagem do mario
        time(); // Começa  função time
        
        moverElementos(imgCano);
        moverElementos(imgBomba, 1.5);

        pegarElementos();
    }, 6000);
};

const time = () => {
    tempoTime = setInterval(() => {
        tempoJogador = txtTempo.innerHTML; //00
        tempoJogador ++; //1
        txtTempo.innerHTML = tempoJogador; //1
    }, 1000);
};

const moverElementos = (elemento, retardo = 0) => {
    tempoMoverElementos = setInterval(() => {
        if(tempoJogador <= 20) {
            elemento.style.animation = `move-elementos 3s infinite linear ${retardo}s`;
        } else if (tempoJogador <= 30) {
            elemento.style.animation = `move-elementos 2.5s infinite linear ${retardo}s`;
        } else if (tempoJogador <= 40) {
            elemento.style.animation = `move-elementos 2s infinite linear ${retardo}s`;
        } else if (tempoJogador <= 50) {
            elemento.style.animation = `move-elementos 1.2s infinite linear ${retardo}s`;
        }
    }, 1);
};

const pegarElementos = () => {
    tempoPegarElementos = setInterval(() => {
        let posicaoMarioBottom = window.getComputedStyle(modulos.imgMario).bottom.replace('px', '');

        let posicaoMarioTop = modulos.imgMario.offsetTop;

        // Chamar elemento, passa no forEach, dois parametros, um é o elemento e o outro a posição do elemento
        imgMoedas.forEach((item, index) =>{
            let posicaoMoedaLeft = item.offsetLeft;

            if(posicaoMarioBottom >= 170 && posicaoMoedaLeft <= 150){
                moedasJogador++;

                txtMoedas.innerHTML = moedasJogador;

                item.style.display = 'none';

                modulos.playSom('somMoeda');

                setTimeout(() => {
                    item.style.display = 'block';
                }, 250);
            }
            
        });

    }, 150);
};
