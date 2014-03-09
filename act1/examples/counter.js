var makeCounter;

makeCounter = function () {
  var i = 0;

  return function () {
    return ++i;
  };
};

var a = makeCounter()
  , b = makeCounter();

console.log(a()); // => 1
console.log(b()); // => 1
console.log(a()); // => 2
