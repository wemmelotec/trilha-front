// Atividade: Manipulação de Arrays em JavaScript

// 1. Criação de Arrays
const notas = [7.5, 8.0, 6.5, 9.2, 5.8];
console.log('Notas iniciais:', notas);

// 2. Acesso aos Elementos
console.log('Primeira nota:', notas[0]);
console.log('Última nota:', notas[notas.length - 1]);

// 3. Adicione uma nova nota ao final do array usando push()
notas.push(7.8);
console.log('Após push:', notas);

// 4. Remova a primeira nota do array usando shift()
notas.shift();
console.log('Após shift:', notas);

// 5. Iteração com forEach
console.log('Notas (forEach):');
notas.forEach((nota, i) => {
	console.log(`Nota ${i + 1}:`, nota);
});

// 6. Cálculo da Média
const soma = notas.reduce((acumulador, nota) => acumulador + nota, 0);
const media = soma / notas.length;
console.log('Média das notas:', media.toFixed(2));

// 7. Filtro de Notas maiores que 7
const notasMaioresQue7 = notas.filter(nota => nota > 7);
console.log('Notas maiores que 7:', notasMaioresQue7);

// 8. Ordenação crescente
// isso é um operador spread que faz uma cópia rasa do array
const notasOrdenadas = [...notas].sort((a, b) => a - b);
console.log('Notas ordenadas:', notasOrdenadas);

// 9. Busca de Elementos: includes
const temNota65 = notas.includes(6.5);
console.log('O array contém a nota 6.5?', temNota65);

// 10. Encontre o Índice: indexOf para 8.0
const indice8 = notas.indexOf(8.0);
console.log('Índice da nota 8.0:', indice8);

// 11. Mapeamento: notas ao quadrado
const notasQuadrado = notas.map(nota => nota ** 2);
console.log('Notas ao quadrado:', notasQuadrado);
