/*
The translation step can also be very complex in real compilers.
However in our compiler it's extremly simple since our output is Lisp.
Lisp is a special langauge because it's syntax is equivalent to a Lisp datatype
This means that Lisp code has the same structure as a Lisp AST, which leads to some very powerful features.
It also means that our job here is very simple.
The input object has the right structure, We just have to swap out some symbols and we're done:

['PLUS', 'NUMBER1', 'NUMBER2'] -> (+ 1 2)

We got rid of nested arrays in the optimization step, so assume the input is just an array with NUMBER and PLUS.
So we'll go through the array and translate the words, then join the resulting array into a string with ' '.
Finally we'll wrap the whole thing in parenthesis and we're done!
*/
const { fromNUMBER, PLUS } = require('./lexer.js');

function translator(array) {
  const translatedArray = array.map((element) => {
    return element === PLUS
      ? '+'
      : fromNUMBER(element);
  });
  const innerString = translatedArray.join(' ');
  return `(${innerString})`
}

module.exports = translator;
