/**
* My turn!
*
* Given an unsorted array of integers
* write a function that prints out the
* integer that is missing
*
*/

function missingno(input) {
  input.sort();

  for(var i=1; i<input.length; ++i)
    if(input[i]-input[i-1] !== 1)
      return input[i] - 1;

  return null;
}

require('../tests/missingno.js')(missingno);
