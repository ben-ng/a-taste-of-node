var assert = require('assert');

module.exports = function (inception) {
  assert.strictEqual(inception('stop'), 1
    , 'inception(\'stop\') should return 1');

  assert.strictEqual(inception()('stop'), 2
    , 'inception()(\'stop\') should return 2');

  assert.strictEqual(inception()()('stop'), 3
    , 'inception()()(\'stop\') should return 3');

  assert.strictEqual(inception()()()()()()()()()('stop'), 10
    , 'this should return 10');

  console.log('All tests passed.');
  console.log('You nailed it! Now go help your neighbor.');
};
