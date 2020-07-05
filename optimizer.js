/*
The optimization step is usually the most complex step of a compiler
It generally consists of a lot of transformations on the AST to make the output code more optimized.
The output doesn't neccessarily have to be a valid AST, just a data structure our translator will recognize.
Generally "optimized" means "faster", but it our case it's more like "more readable".
The pattern we want to optimize is when there are chains of nested PLUS's:

['PLUS', 'NUMBER1', ['PLUS', 'NUMBER2', ['PLUS', 'NUMBER3', 'NUMBER4']]]

These can be simplified into one PLUS with multiple arguments:

['PLUS', NUMBER1, 'NUMBER2', 'NUMBER3', 'NUMBER4']

This means that our output will always be an array with PLUS as the first element and numbers as the rest
To do this we'll scan through the input pushing non PLUS elements into the output.
If we come across an array, we'll repeat the same process on it.
*/
const { PLUS } = require('./lexer.js');

function optimizer(ast) {
  const output = [PLUS];
  const optimizeArray = (array) => {
    array.forEach((element) => {
      if (Array.isArray(element)) {
        optimizeArray(element);
      } else if (element !== PLUS) {
        output.push(element);
      }
    });
  }
  optimizeArray(ast);
  return output;
}

module.exports = optimizer;
