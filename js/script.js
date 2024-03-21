//import {getBanco, setBanco, bancoTemp} from './conexao.js';
import * as conexoes from './conexao.js';
import * as modulos from './modulos.js';

// Variaveis globais
let nomeJogador;
let moedasJogador = 0;
let estrelasJogador = 0;
let tempoJogador = 0;
let pontuacaoJogador = 0;

// console.log(getBanco())
// conexoes.teste();

document.addEventListener('keydown', modulos.pular);