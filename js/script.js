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


// Variaveis globais
let nomeJogador;
let moedasJogador = 0;
let estrelasJogador = 0;
let tempoJogador = 0;
let pontuacaoJogador = 0;

let tempoTime;

// Funções

const validarJogador = ({target}) => {

    // console.log(target.value);

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
    }, 6000);
};

const time = () => {
    tempoTime = setInterval(() => {
        tempoJogador = txtTempo.innerHTML; //00
        tempoJogador ++; //1
        txtTempo.innerHTML = tempoJogador; //1
    }, 1000);
};