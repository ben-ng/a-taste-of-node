/*
* Something is wrong with this code...
* can you use closures to fix it?
*/

function sleepsort (input, console, setTimeout) {
  for(var i = 0; i<input.length; ++i) {
    setTimeout(function () {

      console.log(input[i]);

    }, input[i] * 1000);
  }
}

module.exports = sleepsort;
