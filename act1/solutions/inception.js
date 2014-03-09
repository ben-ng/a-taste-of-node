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
* You're only two lines away from success!
* Think about how to make inception('stop') return 1
* Then think about what the recursive case should be
*
* Run this file to test your solution! `node inception.js`
*
*/

/**
* @param stop - Whether or not the first call should stop
*/
function inception(shouldStop) {
  return makeInception(1)(shouldStop);
}

function makeInception(depth) {
  return function (shouldStop) {
    if(shouldStop == 'stop')
      return depth;
    else
      return makeInception(depth + 1);
  };
}

module.exports = inception;
