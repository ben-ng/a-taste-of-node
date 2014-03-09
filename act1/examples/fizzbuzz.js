/**
* Write a program that prints the numbers from 1 to 100.
* But for multiples of three print “Fizz” instead of the number
* and for the multiples of five print “Buzz”.
* For numbers which are multiples of both three and five print “FizzBuzz”.
*/

for(var i=1, ii=100; i<=ii; ++i) {
  var three = i%3 === 0
    , five = i%5 === 0
    , both = three && five;

  if(both)
    console.log('FizzBuzz');
  else if(three)
    console.log('Fizz');
  else if(five)
    console.log('Buzz');
  else
    console.log(i);
}
