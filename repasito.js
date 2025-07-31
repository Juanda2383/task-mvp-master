// // teoria de los condicionales...

// if (condicion) {
//   //el codigo que se ejecuta si es verdadera la condicion
// } else if (otraCondicion) {
//   // se ejecuta si la primera fue falsa pero la segunda, si la hay es verdadera
// } else {
//   // si la condicion es falsa.
// }


// // Switch y case

// // Útil cuando comparas la misma expresión contra varios valores.

// swtich (condicion) {
//   case valor1:
//     // codigo a ejecutar
//     break;
//   case valor2:
//     // codigo a ejecutar
//     break;
//   default:
//     // si nada coincide
// };

// // Buena práctica

// // Evita anidar demasiados if/else; considera un switch o crear función auxiliar.

// // Siempre pon break en cada case para evitar “caída” (fall-through).


// como declarar funciones en JS.

// declaración:
function doble(x) {
  return x*2
}

// hoisted (que la funcion se declara en tiempo de ejecucion antes de llegar a la linea donde se ejecuta o se declara, pero no necesariamente se opera.)


// Expresiones:
const triple = function(x){
  return x*3
}

// la expresion indica que la variable esta definida directamente como el resultado de la funcion que necesitamos ejecutar.


// Arrow function (this)
const suma = (a,b) => a+b
