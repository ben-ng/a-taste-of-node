/**
* My turn!
*
* Write a function that returns another function if
* it is called without any arguments. if it returns
* an argument, the function should return an integer
* representing the number of times it was called
* without arguments.
*
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

require('../tests/inception.js')(inception);
