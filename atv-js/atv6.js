// Atividade: Manipulação de JSON em JavaScript

// 1. Criação de um Objeto JSON
let aluno = {
	nome: 'Ana Silva',
	idade: 21,
	curso: 'Engenharia',
	notas: [8.5, 7.2, 9.0]
};
console.log('Aluno inicial:', aluno);

// 2. Acesso a Propriedades
console.log('Nome do aluno:', aluno.nome);
console.log('Primeira nota:', aluno.notas[0]);

// 3. Modificação de Propriedades
aluno.idade = 22;
aluno.notas.push(8.8);
console.log('Aluno após atualização:', aluno);

// 4. Conversão para String
const alunoStr = JSON.stringify(aluno);
console.log('Aluno em string JSON:', alunoStr);

// 5. Conversão para Objeto
const alunoObj = JSON.parse(alunoStr);
console.log('Aluno convertido de volta para objeto:', alunoObj);

// 6. Iteração sobre Propriedades
console.log('Propriedades do aluno:');
for (let prop in aluno) {
	console.log(`${prop}:`, aluno[prop]);
}

// 7. Cálculo da Média das Notas
const media = aluno.notas.reduce((acumulador, nota) => acumulador + nota, 0) / aluno.notas.length;
console.log('Média das notas:', media.toFixed(2));

// 8. Objeto JSON Aninhado
aluno.endereco = {
	rua: 'Rua das Flores',
	cidade: 'São Paulo',
	estado: 'SP'
};
console.log('Aluno com endereço:', aluno);

// 9. Acesso a Dados Aninhados
console.log('Cidade:', aluno.endereco.cidade);
console.log('Estado:', aluno.endereco.estado);

// 10. Lista de Alunos
let alunos = [
	aluno,
	{
		nome: 'Bruno Lima',
		idade: 23,
		curso: 'Medicina',
		notas: [9.5, 8.7, 7.8, 9.0],
		endereco: { rua: 'Av. Central', cidade: 'Rio de Janeiro', estado: 'RJ' }
	},
	{
		nome: 'Carla Souza',
		idade: 20,
		curso: 'Direito',
		notas: [7.0, 8.2, 8.9],
		endereco: { rua: 'Rua Azul', cidade: 'Belo Horizonte', estado: 'MG' }
	},
	{
		nome: 'Diego Torres',
		idade: 22,
		curso: 'Engenharia',
		notas: [9.2, 9.8, 8.7],
		endereco: { rua: 'Rua Verde', cidade: 'Curitiba', estado: 'PR' }
	}
];
console.log('Lista de alunos:', alunos);

// 11. Filtragem de Alunos com média > 8
const alunosComMediaAlta = alunos.filter(aluno => {
	const media = aluno.notas.reduce((acumulador, nota) => acumulador + nota, 0) / aluno.notas.length;
	return media > 8;
});
console.log('Alunos com média > 8:', alunosComMediaAlta);


// Método sendo menos direto
const alunosComMediaAlta2 = [];

for (let i = 0; i < alunos.length; i++) {
  const aluno = alunos[i];
  let soma = 0;

  for (let j = 0; j < aluno.notas.length; j++) {
    soma = soma + aluno.notas[j];
  }

  const media = soma / aluno.notas.length;
  
  if (media > 8) {
    alunosComMediaAlta2.push(aluno);
  }
}

console.log('Alunos com média > 8:', alunosComMediaAlta2);