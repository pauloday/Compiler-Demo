/*
Break the input string up into meaningful words
Our language only understands integer addition, so the words are either a number or '+'.
First, we'll define our words:
*/
const PLUS = 'PLUS';
const NUMBER = (n) => n; // this is redundant, but it's included for consistency
/*
Our output will be an array consisting of these two values.
But first, some helper functions:
*/
const isNumber = (n) => !isNaN(Number(n)); // return true if input is a number
const isNotSpace = (str) => str.match(/^\s/) === null; // return true if input is not whitespace
/*
We'll iterate over the string and do some logic on each char to push the corresponding word into our output.
This is overkill for such a simple language, but this structure more closely matches how a real compiler works
We'd have to make the lexer this complex as soon as we started adding pretty much any basic syntax features
*/
function lexer(inputString) {
  const output = [];
  const unfilteredInputArray = inputString.split('');
  const inputArray = unfilteredInputArray.filter(isNotSpace);
  for (let index = 0; index < inputArray.length; index++) {
    const char = inputArray[index];
    if (char === '+') {
      // we need to make sure this plus is in a valid place
      // syntax errors are usually caught in this step
      if (!isNumber(inputArray[index - 1]) || !isNumber(inputArray[index + 1])) {
        // this is not a great error message, but a better one is beyond the scope of this demo
        throw new Error('syntax error');
      }
      output.push(PLUS);
    } else if (isNumber(char)) {
      // if it is a number, we need deal with it maybe being a multidigit one
      const digits = [];
      while (isNumber(inputArray[index]) && index < inputArray.length) {
        digits.push(inputArray[index]);
        index += 1;
      }
      // the while loop exits when the index is no longer on a number
      // so we have to reset it to avoid skipping that non-number character in the for loop
      index -= 1; 
      output.push(NUMBER(digits.join('')));
    }
  }
  return output;
}

module.exports = { PLUS, lexer };