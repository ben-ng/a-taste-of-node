/**
* Your turn!
*
* Given an unsorted array of integers
* write a function that prints out the
* integer that is missing
*
* - The array won't have duplicates
* - There will be no more than 1 missing integer
* - but there might not be a missing integer either
*
* Example Input => Output
* missingno([]) => null
* missingno([3, 1]) => 2
* missingno([2]) => null
* missingno([1, 2, 3]) => null
* missingno([2, 1, 3, 5]) => 4
*
* Helpful hints (beyond those in cheatsheet.js):
*
* Array.sort() sorts an array:
*  [3, 2, 1].sort() => [1, 2, 3]
*
* Array.length gives you its length:
*  [3, 2, 1].length => 3
*
* Run this file to test your solution! `node missingno.js`
*
*/

/**
* @param input - an array of unsorted integers
*/
function missingno(input) {
  input.sort();

  for(var i=1; i<input.length; ++i)
    if(input[i]-input[i-1] !== 1)
      return input[i] - 1;

  return null;
}

module.exports = missingno;
