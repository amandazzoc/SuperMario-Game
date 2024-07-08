const setBanco = (banco) => {
    localStorage.setItem('bd-mario', banco);
};

const getBanco = () => {
    return JSON.parse(localStorage.getItem('bd-mario')) ?? [];
};



// Função que recebe os parametros do jogador
const bancoTemp = (nome, moedas, estrelas, tempo, pontuacao) => {

    //Variavel que recebe as informações do banco
    let banco = getBanco();  // <-- Array

    // Encapsula as informações dentro de um objeto
    let dados = {
        nomeJogador: nome,
        moedasJogador: moedas,
        estrelasJogador: estrelas,
        tempoJogador: tempo,
        pontuacaoJogador: pontuacao
    };

    // Acrescenta conteudo ao invés de substitui
    banco.unshift(dados);

    // Manda pro banco em forma de string
    setBanco(JSON.stringify(banco));
};

export { setBanco, getBanco, bancoTemp};