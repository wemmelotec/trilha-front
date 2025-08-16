

import { gerarNumeroAleatorio } from './moduloNumero.js';
import { verificarTentativa } from './moduloVerifica.js';

// Parâmetros do jogo
const min = 1;
const max = 100;
const maxTentativas = 7;
let numeroCorreto;
let tentativas;
let historico;
let fimDeJogo = false;

function atualizarInfoTela() {
    document.getElementById('min').textContent = min;
    document.getElementById('max').textContent = max;
    document.getElementById('tentativas-max').textContent = maxTentativas;
}

function iniciarJogo() {
    numeroCorreto = gerarNumeroAleatorio(min, max);
    tentativas = 0;
    historico = [];
    fimDeJogo = false;
    document.getElementById('input-tentativa').value = '';
    document.getElementById('input-tentativa').disabled = false;
    document.getElementById('btn-tentar').disabled = false;
    document.getElementById('feedback').textContent = '';
    document.getElementById('historico').innerHTML = '';
    atualizarInfoTela();
}

window.reiniciarJogo = iniciarJogo;

window.tentarAdivinhar = function() {
    if (fimDeJogo) return;
    const tentativa = Number(document.getElementById('input-tentativa').value);
    if (isNaN(tentativa) || tentativa < min || tentativa > max) {
        document.getElementById('feedback').textContent = `Digite um número válido entre ${min} e ${max}.`;
        return;
    }
    tentativas++;
    const mensagem = verificarTentativa(tentativa, numeroCorreto);
    historico.push(`Tentativa ${tentativas}: ${tentativa} — ${mensagem}`);
    document.getElementById('historico').innerHTML = historico.map(h => `<div>${h}</div>`).join('');
    document.getElementById('feedback').textContent = mensagem;
    if (mensagem.includes('Parabéns') || tentativas >= maxTentativas) {
        fimDeJogo = true;
        document.getElementById('input-tentativa').disabled = true;
        document.getElementById('btn-tentar').disabled = true;
        if (!mensagem.includes('Parabéns')) {
            document.getElementById('feedback').textContent = `Suas tentativas acabaram! O número correto era ${numeroCorreto}.`;
        }
    }
    document.getElementById('input-tentativa').value = '';
    document.getElementById('input-tentativa').focus();
}

// Inicializa o jogo ao carregar a página
window.onload = function() {
    atualizarInfoTela();
    iniciarJogo();
};