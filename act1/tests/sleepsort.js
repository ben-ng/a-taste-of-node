var assert = require('assert');

module.exports = function (sleepsort, cb) {
  var buffer = []
    , console = {}
    , st;

  console.log = function (ans) {
    buffer.push(ans);
  };

  st = function () {
    setTimeout.call(this, arguments[0], arguments[1]/100);
  };

  sleepsort([2,1,3], console, st);

  setTimeout(function () {
    assert.deepEqual(buffer, [1,2,3], 'Expected: [2,1,3] Yours: [' + buffer.join(',') + ']');

    cb();
  }, 500);
};
