const compile = require('./compile.js');

function testCompiler(input, expected) {
  const output = compile(input);
  console.log('compiler is working:', output === expected);
}

function testErrors() {
  const numberError = '1 1';
  const plusError = '+ +';
  const wordError = 'invalidWord';
  try {
    compile(numberError);
  } catch(err) {
    console.log(err.message);
    try {
      compile(plusError);
    } catch(err) {
      console.log(err.message);
      try {
        compile(wordError);
      } catch(err) {
        console.log(err.message);
      }
    }
  }
}

// testCompiler('1 + 20 + 300', '(+ 1 20 300)');
// testErrors();