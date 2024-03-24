const imgMario = document.querySelector('#imgMario');

const playSom = (elemento) => {
    const element = document.querySelector(`#${elemento}`);
    element.play();
};

const stopSom = (elemento) => {
    const element = document.querySelector(`#${elemento}`);

    element.pause();
};

const pular = ({key}) => {
    if(key === 'w'){
        imgMario.classList.add(`pular`);

        playSom('somPulo');

        setTimeout(() => {
            imgMario.classList.remove(`pular`);
        }, 500);
    }
};


const voar = ({key}) => {
    if(key === ' ') {
        imgMario.classList.add('voar');
        imgMario.src = './img/mario-voando.png';
        
        playSom('somVoar');

        setTimeout(() => {
            imgMario.classList.remove(`voar`);
            imgMario.src = './img/mario.gif';
        }, 1500);
    }
}

const abaixar = ({key}) => {
    if(key === 's') {
        imgMario.classList.add('abaixar');
        imgMario.src = './img/mario-agachado.png';

        playSom('somAgachado');


    }
};


const levantar = ({key}) =>{
    if(key === 's') {
        imgMario.classList.remove('abaixar');
        imgMario.src = './img/mario.gif';
    };
};

const limparTexto = () =>{
    inputJogador.value = '';
    btnStart.setAttribute('disabled', '');
};


export {playSom, stopSom, pular, voar, abaixar, levantar, limparTexto, imgMario};