/*
The parser will take an array from the lexer and translate it into a tree data structure.
This is known as an 'Abstract Syntax Tree' (AST).
Our simple language will only every make binary trees, but this isn't true for more complex ones.
We'll just represent the tree as nested arrays where the first element is a node and the rest are the children.

Each node of the tree will represent a function (i.e. '+') with branches as arguments.
Each leaf will be a number.

1 + 1 -> + or ['PLUS', 1, 1]
        / \
       1  1

1 + 1 + 1 -> + or ['PLUS', 1, ['PLUS', 1, 1]]
            / \
           1  +
             / \
            1  1

We caught syntax errors in the lexing step, so we can make a number of assumptions about the input array.
We can assume the 1st index is just a number, 2nd is PLUS, and the rest is a number or code that follows these rules
So we'll make a tree with everything on the left as one node, and everything on the right as the other.
Then if everything on the right is just one number, we're done.
If not, we'll repeat the process on that branch, which will also be valid code like the parent array.
So we can use recursion!
*/
const { PLUS } = require('./lexer.js');

function parser(array) {
  const leftBranch = array[0];
  let rightBranch = array.slice(2);
  if (rightBranch.length > 1) {
    rightBranch = parser(rightBranch);
  } else {
    rightBranch = rightBranch[0];
  }
  return [PLUS, leftBranch, rightBranch];
}

module.exports = parser;
