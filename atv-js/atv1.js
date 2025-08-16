// Limpa os campos e resultado da multiplicação
function limparMultiplicacao() {
    document.getElementById('mult1').value = '';
    document.getElementById('mult2').value = '';
    document.getElementById('resultado-mult').textContent = '';
}

// Limpa os campos e resultado da divisão
function limparDivisao() {
    document.getElementById('div1').value = '';
    document.getElementById('div2').value = '';
    document.getElementById('resultado-div').textContent = '';
}

// Função para multiplicar dois valores dos inputs e mostrar na tela
function calcularMultiplicacao() {
    const m1 = Number(document.getElementById('mult1').value);
    const m2 = Number(document.getElementById('mult2').value);
    const resultado = m1 * m2;
    document.getElementById('resultado-mult').textContent =
        `O resultado da multiplicação ${m1} x ${m2} = ${resultado}`;
}

// Função para dividir dois valores dos inputs e mostrar na tela
function calcularDivisao() {
    const d1 = Number(document.getElementById('div1').value);
    const d2 = Number(document.getElementById('div2').value);
    let resultado;
    if (d2 === 0) {
        resultado = 'Não é possível dividir por zero';
    } else {
        resultado = d1 / d2;
    }
    document.getElementById('resultado-div').textContent =
        `O resultado da divisão ${d1} ÷ ${d2} = ${resultado}`;
}
// Limpa os campos e resultado da soma
function limparSoma() {
    document.getElementById('valor1').value = '';
    document.getElementById('valor2').value = '';
    document.getElementById('resultado').textContent = '';
}

// Limpa os campos e resultado da subtração
function limparSubtracao() {
    document.getElementById('sub1').value = '';
    document.getElementById('sub2').value = '';
    document.getElementById('resultado-sub').textContent = '';
}

// Função para somar dois valores dos inputs e mostrar na tela
function calcularSoma() {
    const v1 = Number(document.getElementById('valor1').value);
    const v2 = Number(document.getElementById('valor2').value);
    const resultado = v1 + v2;
    document.getElementById('resultado').textContent =
        `O resultado da soma ${v1} + ${v2} = ${resultado}`;
}

// Função para subtrair dois valores dos inputs e mostrar na tela
function calcularSubtracao() {
    const s1 = Number(document.getElementById('sub1').value);
    const s2 = Number(document.getElementById('sub2').value);
    const resultado = s1 - s2;
    document.getElementById('resultado-sub').textContent =
        `O resultado da subtração ${s1} - ${s2} = ${resultado}`;
}