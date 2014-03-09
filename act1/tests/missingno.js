var assert = require('assert');

module.exports = function (missingno) {
  assert.strictEqual(missingno([]), null
    , 'missingno([]) should return null');

  assert.strictEqual(missingno([3, 1]), 2
    , 'missingno([3, 1]) should return 2');

  assert.strictEqual(missingno([2]), null
    , 'missingno([2]) should return null');

  assert.strictEqual(missingno([1, 2, 3]), null
    , 'missingno([1, 2, 3]) should return null');

  assert.strictEqual(missingno([2, 1, 3, 5]), 4
    , 'missingno([2, 1, 3, 5]) should return 4');
};
