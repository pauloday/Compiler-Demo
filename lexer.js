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
/*
We'll split the string on ' ' and go through it, translating each part into words.
Along the way we'll check for syntax errors.
*/
function lexer(inputString) {
  const output = [];
  const inputArray = inputString.split(' ');
  inputArray.forEach((inputWord, index) => {
    const nextWord = inputArray[index + 1];
    const lastWord = inputArray[index - 1];
    if (isPlus(inputWord)) {
      // we need to make sure this plus is in a valid place
      if (!isNumber(lastWord) || !isNumber(nextWord)) {
        throw new Error(`syntax: + not surrounded by numbers in \"${inputString}\"`);
      }
      output.push(PLUS);
    } else if (isNumber(inputWord)) {
      // make sure the number has pluses surrounding it
      // if the number is at the start or end, nextWord or lastWord might be undefined
      // but that's ok, with how isNumber is written, this will still work
      if (isNumber(lastWord) || isNumber(nextWord)) {
        throw new Error(`syntax: number not surrounded by pluses in \"${inputString}\"`);
      }
      output.push(NUMBER(inputWord));
    } else {
      throw new Error(`syntax: unrecognized word: \"${inputWord}\" in ${inputString}`)
    }
  });
  return output;
}

module.exports = { PLUS, lexer };
