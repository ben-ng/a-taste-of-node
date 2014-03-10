/*
* Something is wrong with this code...
* can you use closures to fix it?
*/

function sleepsort (input, console, setTimeout) {
  for(var i = 0; i<input.length; ++i) {
    // This is called an "immediately invoked function expression"
    // the function is immediately invoked with the value of i as the parameter j
    // and the setTimeout callback "closes over" this function scope
    // so when the callback executes, j is what i was when the function was created!
    (function (j) {
      setTimeout(function () {

        console.log(input[j]);

      }, input[j] * 1000);
    })(i);
  }
}

module.exports = sleepsort;
