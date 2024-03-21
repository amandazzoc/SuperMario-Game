const imgMario = document.querySelector('#imgMario');

const playSom = (elemento) => {
    const element = document.querySelector(`#${elemento}`);
    element.play();
};

const stopSom = (elemento) => {
    const element = document.querySelector(`#${elemento}`);

    element.pause();
};

const pular = (xuxu) => {
    console.log(`A telca que você apertou foi: ${xuxu}`);
};


export {playSom, stopSom, };