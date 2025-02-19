let frutas = ["Maçã", "Laranja"];
console.log(frutas);

frutas.push("Morango");
// podemos adicionar mais de 1 elemento
frutas.push("Uva", "Abacaxi");
console.log(frutas);

console.log(frutas.pop()); // remove o último elemento
console.log(frutas);

console.log(frutas.shift()); // remove o primeiro elemento
console.log(frutas);

frutas.unshift("Melão"); // adiciona o elemento no inicio
// podemos adicionar mais de 1 elemento de inicio
frutas.unshift("Limão", "Damasco");
console.log(frutas)