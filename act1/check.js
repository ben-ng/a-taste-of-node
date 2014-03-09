var color = require('cli-color')
  , green = color.green
  , red = color.red
  , boldRed = color.red.bold
  , test;

test = function (module) {
  console.log(green('Checking ' + module + '...'));

  var t = require('./tests/' + module);

  // Check our solution first
  t(require('./solutions/' + module));

  try {
    // Check their solution
    t(require('./exercises/' + module));

    console.log(green('> PASSED!'));
  }
  catch(e) {
    console.log(boldRed('> FAILED: ') + red(e.message));
    console.log(e.stack);
  }
};

test('missingno');
test('inception');
