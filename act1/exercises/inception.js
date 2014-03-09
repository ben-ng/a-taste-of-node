/**
* Time to demonstrate your understanding of closures!
*
* Write a function that returns another function if
* it is called without any arguments. if it returns
* an argument, the function should return an integer
* representing the total number of times it was called.
*
* Example Input => Output
* inception('stop') => 1
* inception()('stop') => 2
* inception()()('stop') => 3
*
* Helpful Hint:
* Edit the template provided below -- you're only four
* lines of code away from success!
*
* Run this file to test your solution! `node inception.js`
*
*/

/**
* @param stop - Whether or not the first call should stop
*/
function inception(shouldStop) {
  // THINK: Do you understand why inception('stop') returns 1?
  return makeInception(1)(shouldStop);
}

/**
* makeInception is a helper method that creates functions.
*
* @param depth - The integer that the created function should
*                return if it is called with 'stop'
*/
function makeInception(depth) {
  return function (shouldStop) {
    // YOUR CODE HERE!
    // HINT: note that you can use the depth variable from here
    //       and even make recursive calls to makeInception()
  };
}

// Don't touch! Runs the tests on your solution
require('../tests/inception.js')(inception);
