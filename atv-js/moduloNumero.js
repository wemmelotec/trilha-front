// moduloNumero.js
// Função para gerar um número aleatório inteiro entre min e max (inclusive)
export function gerarNumeroAleatorio(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
