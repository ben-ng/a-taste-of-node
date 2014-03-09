var i = 0
  , counter;

counter = function () {
  return ++i;
};

console.log(counter()); // => 1
console.log(counter()); // => 2
console.log(counter()); // => 3
