// Atualiza o texto do botão de acordo com a operação selecionada
function atualizarBotao() {
    const select = document.getElementById('operacao');
    const btn = document.getElementById('btn-operacao');
    switch (select.value) {
        case 'soma':
            btn.textContent = 'Somar';
            break;
        case 'subtracao':
            btn.textContent = 'Subtrair';
            break;
        case 'multiplicacao':
            btn.textContent = 'Multiplicar';
            break;
        case 'divisao':
            btn.textContent = 'Dividir';
            break;
    }
}

// Executa a operação selecionada
function executarOperacao() {
    const v1 = Number(document.getElementById('valor1').value);
    const v2 = Number(document.getElementById('valor2').value);
    const operacao = document.getElementById('operacao').value;
    let resultado;
    let texto = '';
    switch (operacao) {
        case 'soma':
            resultado = v1 + v2;
            texto = `O resultado da soma ${v1} + ${v2} = ${resultado}`;
            break;
        case 'subtracao':
            resultado = v1 - v2;
            texto = `O resultado da subtração ${v1} - ${v2} = ${resultado}`;
            break;
        case 'multiplicacao':
            resultado = v1 * v2;
            texto = `O resultado da multiplicação ${v1} x ${v2} = ${resultado}`;
            break;
        case 'divisao':
            if (v2 === 0) {
                texto = 'Não é possível dividir por zero';
            } else {
                resultado = v1 / v2;
                texto = `O resultado da divisão ${v1} ÷ ${v2} = ${resultado}`;
            }
            break;
    }
    document.getElementById('resultado').textContent = texto;
}

// Limpa os campos e resultado da calculadora
function limparCalculadora() {
    document.getElementById('valor1').value = '';
    document.getElementById('valor2').value = '';
    document.getElementById('resultado').textContent = '';
    document.getElementById('operacao').value = 'soma';
    atualizarBotao();
}

// Inicializa o botão correto ao carregar a página
window.onload = atualizarBotao;