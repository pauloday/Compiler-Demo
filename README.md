# Let's build a (very simple) compiler!

A compiler is just a normal program that takes a string and outputs a different string.
The input string is lines of code, and the output string is different lines of code.
Typically the output string is code in a lower level language (i.e. closer to machine code/pure numbers).
An example of a compiler you may be using is Babel, which translates Javascript from newer to older versions.
(more accurately babel is transpiler since both input and output are Javascript, but that's just a type of compiler)

## A quick note on interpreters

Interpreters are like compilers, but they translate lines of code one at a time on the fly.
Any langauge can be either interpreted or compiled, but most languages are designed with one or the other in mind.
Typically an interpreted langauge has a running program that will run your code as as its received.
A very common way for this to happen is through a REPL (read-eval-print loop).
A example of a REPL is the Javascript console in your web browser.
Javascript is designed to be interpreted by web browsers rather than compiled, 
We're building a compiler, but the basic steps are the same for interpreters - they just happen at a different speed.


Compilers can get *very* complex, but at their core they usually have 4 basic steps:
  1. Lexing - break the input code into meaningful chunks (or "words")
  2. Parsing - convert the words into a data structure
  3. Optimization - modify the data structure so it will generate efficient output
  4. Translation - use the data structure to construct output code

For this demo, we'll be implementing a compiler for a *very* simple langauge that can only express addition.
It will take an input string that consists of numbers and '+', and output a line of Lisp code.
Each the integers and pluses must be separated by a single space.
I chose Lisp as the output because it's my favorite langauge.
But also represents math a bit differently, so there'll actually be a difference between input and output
