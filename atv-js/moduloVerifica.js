// moduloVerifica.js
// Função para verificar a tentativa do jogador
export function verificarTentativa(tentativa, numeroCorreto) {
    if (tentativa > numeroCorreto) {
        return 'O número é menor.';
    } else if (tentativa < numeroCorreto) {
        return 'O número é maior.';
    } else {
        return 'Parabéns! Você acertou!';
    }
}
