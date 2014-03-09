function palindrome (word) {
  return word.split('').reverse().join('') == word;
}

console.log(palindrome('racecar')); // => true
console.log(palindrome('cat')); // => false
