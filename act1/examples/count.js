var i = 0
  , count;

count = function () {
  return ++i;
};

console.log(count()); // => 1
console.log(count()); // => 2
console.log(count()); // => 3
