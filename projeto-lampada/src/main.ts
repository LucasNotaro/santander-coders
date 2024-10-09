const [botaoLigarDesligar] = document.getElementsByTagName('button');
const lampada = document.getElementById('lampada') as HTMLImageElement | null;

const cliquesParaQuebrar = Math.floor(Math.random() * 16) + 5; // de 5 a 20

let contadorDeCliques = 0;

const alternarEstadoLampada = () => {
    if (lampada!.src.includes('Desligada')) {
        lampada!.src = '/lampadaLigada.jpg';
    } else {
        lampada!.src = '/lampadaDesligada.jpg';
    }
};

if (lampada && botaoLigarDesligar) {
    botaoLigarDesligar.addEventListener('click', () => {
        contadorDeCliques++;

        if (contadorDeCliques === cliquesParaQuebrar) {
            lampada.src = '/lampadaQuebrada.jpg';
            botaoLigarDesligar.disabled = true;
        } else {
            alternarEstadoLampada();
        }
    });
}