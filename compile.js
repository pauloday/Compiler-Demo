const { lexer } = require('./lexer.js')
const parser = require('./parser.js')
const optimizer = require('./optimizer.js')
const translator = require('./translator.js')

function compile(inputString) {
  console.log('input:', inputString);

  const lexed = lexer(inputString);
  console.log('lexer output:', lexed);
  
  const parsed = parser(lexed);
  console.log('parser output:', parsed);

  const optimized = optimizer(parsed);
  console.log('optimizer output:', optimized);

  const translated = translator(optimized);
  console.log('output:', translated);

  return translated;
}

module.exports = compile;
