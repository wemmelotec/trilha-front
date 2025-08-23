// exemplos da aula 23/08

let number;
number = 10;
// reatribuir valores pra mesma constante
number = 100;
console.log(number);

// o var não respeita escopo por isso deixou de ser utilizado
// o var também não identifica tipo, ou  seja, não respeita a ===

const number2 = 20;
//number2 = 200;
console.log(number2);

// listas é importante sempre criar como constantes
const numbers = [1, 2, 3];
numbers.push(4);
console.log(numbers);

/*  Tomar cuidado com var em código */

let variable = 10;
console.log(variable);
console.log(typeof variable);
variable = "fulano";
console.log(typeof variable);
console.log(variable);

const x = 10;
const y = "20";
console.log(x - y);
console.log(x + y);
console.log(x + Number(y));

// lógica de decisão com if
if (x > Number(y)) {
  console.log("x é maior que y");
} else if (x === Number(y)) {
  console.log("x é igual a y");
} else {
  console.log("x não é maior que y");
}

// lógica com o switch
switch (true) {
  case x > Number(y):
    console.log("x é maior que y");
    break;
  case x === Number(y):
    console.log("x é igual a y");
    break;
  default:
    console.log("x não é maior que y");
}

let flag = 1;
while (flag <= 5) {
  console.log(flag);
  flag++;
}

// NaN não é um erro mas é um indicio que algo deu errado

// para evitar ter funcões com o mesmo nome que o js aceita é melhor declarar uma function como uma constante
const somar = function(a, b) {
  return a + b;
}
console.log(somar(5));
console.log(somar(10, 5));
console.log(somar(5, 10, 15));

// constante que é uma função com a sintaxe de arrow function
const subtrair = (a, b) => {
  return a - b;
}
console.log(subtrair(10, 5));

const multiplicar = (a, b) => a * b;
console.log(multiplicar(5, 10));

// parametros rest
const somarRest = (...valores) => {
  let total = 0;
  for (let value of valores) {
    total += value;
  }
  return total;
}
console.log("Resultado do método rest:", somarRest(5, 10, 15));

// parametros rest recebendo arrays
const somarArrays = (...arrays) => {
  let total = 0;
  for (let array of arrays) {
    for (let value of array) {
      total += value;
    }
  }
  return total;
}

const impares = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const pares = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

console.log("Resultado do método rest com arrays:", somarArrays(impares, pares));

// function de callback
const processarNumeros = (num1, num2, callback) => {
  return callback(num1, num2);
}

processarNumeros(5, 10, (a, b) => {
  console.log("Soma no callback:", a + b);
});

/* 
para criar arquivos package.json com o node
1. Abra o terminal na pasta do seu projeto.
2. Execute o comando `npm init -y` para criar um arquivo package.json padrão.
também é possível criar com o npm start
*/

const numbers2 = [];
numbers2[0] = 1;
numbers2[1] = 2;
numbers2[10] = 3;

console.log(numbers2);

// aplicativo pague meia carteira de estudante

// evitar deletar elementos de arrays com o delete, pois ele detela o arquivo mas mantém a posição

// array com multiplos tipos de dados
const mixedArray = [1, "dois", true, null, { nome: "objeto" }, [1, 2, 3]];
console.log(mixedArray[4]);

const numbers3 = [1, 2, 4];
let result = "";
for(let flag = 0; flag < numbers3.length; flag++) {
  result += numbers3[flag]+" ";
}
console.log(result);

let resultIndex = "";
for(const index in numbers3) {
  resultIndex += numbers3[index]+" ";
}
console.log(resultIndex);

// in é index e o of é o valor
let resultForOf = "";
for(const value of numbers3) {
  resultForOf += value + " ";
}
console.log(resultForOf);

const array = [1, 2, 3, 4, 5, 6];
console.log(array.map((value) => value * 2));
console.log(array);

const array2 = [1, 2, 3, 4, 5, 6];
console.log(array2.filter((value) => value % 2 !== 0)); //=> [ 1, 3, 5 ]
console.log(array2); //=> [ 1, 2, 3, 4, 5, 6 ]

const array3 = [1, 2, 3, 4, 5, 6];
console.log(array3.reduce((addition, value) => addition + value, 5));

const ip = { address: '192.168.0.2', mask: '255.255.255.0' }; 

console.log(ip); //=> { address: "192.168.0.2", mask: "255.255.255.0" }
console.log(ip.address); //=> "192.168.0.2"
console.log(ip['address']); //=> "192.168.0.2"

const original = { nome: "Maria", idade: 30 };
const copia = { ...original };

console.log(original); // { nome: "Maria", idade: 30 }
copia.idade = 31;
console.log(copia); // { nome: "Maria", idade: 31 }

// com json em primeira camada o spread operator funciona
// mas com json encadeados o spread operator não é suficiente
// precisa utilizar o JSON.stringify e o JSON.parse
const students = [
  { nome: "Maria", idade: 30 }
];

const newStudents = JSON.parse(JSON.stringify(students));
