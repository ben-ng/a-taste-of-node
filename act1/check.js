var color = require('cli-color')
  , domain = require('domain')
  , async = require('async')
  , green = color.green
  , boldRed = color.red.bold
  , test
  , run
  , skipExercises = (process.argv.pop() === 'solutions');

test = function (module) {
  return function (cb) {
    console.log(green('Checking ' + module + '...'));

    var t = require('./tests/' + module)
      , d = domain.create();

    d.on('error', function (err) {
      if(err) {
        console.log(boldRed('Error: ') + err.message);
        console.log(err.stack);
      }
    });

    d.run(function () {
      var queue = [
        run(t, require('./solutions/' + module))
      ];

      if(!skipExercises) {
        queue.push(run(t, require('./exercises/' + module)));
      }

      async.series(queue, function () {
        console.log(green('All tests passed!'));
        cb();
      });
    });
  };
};

run = function (assert, solution) {
  return function (cb) {
    // async tests
    if(assert.length == 2) {
      assert(solution, cb);
    }
    // sync tests
    else {
      assert(solution);
      setTimeout(cb, 0);
    }
  };
};

async.series([
  test('missingno')
, test('sleepsort')
, test('inception')
]);
