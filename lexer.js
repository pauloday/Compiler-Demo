/*
Break the input string up into meaningful words
Our language only understands integer addition, so the words represent either a number or '+'.
These words will be used to do logic on the output throughout the rest of the compiler:

1 + 2 -> ['NUMBER1', 'PLUS', 'NUMBER2]

It may seem like overkill to not just use '+' and numbers, and for a langauge this simple it is.
But doing it this way means it's a lot easier to modify the syntax of our language.
And it'll make the compiler code clearer, especially if we wanted to start adding more features to the language.
First, we'll define our words. Our output will be an array consisting of these two values:
*/
const PLUS = 'PLUS';
const NUMBER = (n) => `NUMBER${n}`;
/*
And some helper functions for clairity and to make changing the syntax easier:
*/
const isPlus = (input) => input === '+';
const isNumber = (input) => !isNaN(Number(input));
const fromNUMBER = (input) => input.slice(6); // this is used by the translator
/*
We'll split the string on ' ' and go through it, translating each part into words.
Along the way we'll check for syntax errors.
*/
function lexer(inputString) {
  const output = [];
  const inputArray = inputString.split(' ');
  inputArray.forEach((inputWord, index) => {
    if (isPlus(inputWord)) {
      // we need to make sure this plus is in a valid place
      if (!isNumber(inputArray[index - 1]) || !isNumber(inputArray[index + 1])) {
        // this is an awful error message, but a better one is beyond the scope of this demo
        throw new Error('syntax error');
      }
      output.push(PLUS);
    } else if (isNumber(inputWord)) {
      output.push(NUMBER(inputWord));
    }
  });
  return output;
}

module.exports = { PLUS, fromNUMBER, lexer };
