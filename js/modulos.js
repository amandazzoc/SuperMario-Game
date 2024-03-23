// Elementos Globais
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
    if(key == 'w'){
        imgMario.classList.add(`pular`);

        playSom('somPulo');

        setTimeout(() => {
            imgMario.classList.remove(`pular`);
        }, 500);
    }
};

document.addEventListener('keydown', pular);

const voar = ({key}) => {
    if(key == ' ') {
        imgMario.classList.add('voar');
        imgMario.src = './img/mario-voando.png';
        
        playSom('somVoar');

        setTimeout(() => {
            imgMario.classList.remove(`voar`);
            imgMario.src = './img/mario.gif';
        }, 1500);
    }
}
document.addEventListener('keydown', voar);

const abaixar = ({key}) => {
    if(key == 's') {
        imgMario.classList.add('abaixar');
        imgMario.src = './img/mario-agachado.png';
    }
}
document.addEventListener('keydown', abaixar);
export {playSom, stopSom, pular, voar};